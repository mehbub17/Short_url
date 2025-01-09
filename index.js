const express = require("express");
const {connectMongoDB} = require('./connect.js')

const urlRouter = require("./routes/url");
const URL = require("./models/url.js");
const { handleAnalytics } = require("./controllers/url.js");
const path = require("path");
const staticRoute = require('./routes/staticRoute')

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




// app.get('/test',async (req,res) =>
// {
//     const allUrls = await URL.find({});

//     return res.render('home',{
//         urls:allUrls,
//         name:"Mehbub",
//     });

// });



app.use("/url",urlRouter)
app.use("/",staticRoute);

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