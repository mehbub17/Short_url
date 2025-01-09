const shortid = require("shortid")
const URL = require('../models/url.js')

async function handleGenerateShortURL(req,res)
{
    const shortId = shortid();
    const body = req.body;
    if(!body.url)
    {
        return res.status(400).json({error:"Url is required"})
    }
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
    });
    return res.render("home",{
        id:shortId,
    });

}

async function handleAnalytics(req,res)
{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.status(200).json({
        totalClicks:result.visitedHistory.length ,
        analytics:result.visitedHistory,
    });
}

module.exports = {
    handleGenerateShortURL,
    handleAnalytics,
};