const aiService = require("../services/ai.service")


const getReview = async (req, res) => {

    const code = req.body.prompt;

    if (!code) {
        return res.status(400).send("Prompt is required");
    }

    const response = await aiService.generateReview(code);


    res.send(response);

}
const getCode = async(req,res)=>{
    const prompt=req.body.prompt;
    if(!prompt){
        return res.status(400).send("Prompt not found");
    }
    const response = await aiService.generateCode(prompt);
    res.send(response);
}
const getComplexity = async(req,res)=>{
    const prompt=req.body.prompt;
    if(!prompt){
        return res.status(400).send("Prompt not found");
    }
    const response = await aiService.generateComplexity(prompt);
    res.send(response);
}
module.exports = { getReview,getCode,getComplexity }