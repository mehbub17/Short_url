const express = require("express");
const {connectMongoDB} = require('./connect.js')

const URL = require("./models/url.js");
const { handleAnalytics } = require("./controllers/url.js");
const path = require("path");
const cookieParser = require('cookie-parser');

const staticRoute = require('./routes/staticRoute');
const userRoute = require("./routes/user");
const urlRouter = require("./routes/url");
const {restrictToLoggedInUserOnly,checkAuth} = require('./middleware/auth');

const app = express();


const  PORT = 8001;



connectMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>
 {console.log("MongoDB connected")
}
);

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// app.get('/test',async (req,res) =>
// {
//     const allUrls = await URL.find({});

//     return res.render('home',{
//         urls:allUrls,
//         name:"Mehbub",
//     });

// });



app.use("/url",restrictToLoggedInUserOnly,urlRouter);
app.use("/user",userRoute);
app.use("/",checkAuth,staticRoute);

app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry =  await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitedHistory:
            {
                timestamp : Date.now(),
            },
        },
    });

    res.redirect(entry.redirectURL)
});







app.listen(PORT,()=> console.log(`Server started at ${PORT}`))