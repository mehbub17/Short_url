
const User = require('../models/user.js');

const {setUser,getUser} = require('../service/auth.js');



async function handleUserSignUp(req,res)
{
    const{name,email,password} = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");

}

async function handleUserLogin(req,res)
{
    const{name,email,password} = req.body;

    const user = await User.findOne({email,password});

    if(!user)
        return res.render("login",{
            error:"Invalid username of password",
    });
    const token = setUser(user);
    
    res.cookie("uid",token);
    return res.redirect("/");

}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}