
const User = require('../models/user.js');
const { v4} = require('uuid');

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

    const sessionId = v4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);

    return res.redirect("/");

}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}