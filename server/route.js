const {Router}=require("express")
const user=require("./user")
const router=Router()
router.get("/",async(req,res)=>{
    const User =await user.find({})
    res.json({data:User})
})
router.post("/", async (req,res)=>{
    const {title,post,date}= req.body;
    const User = new user({
        title,
        post,
        date,
    });
    await User.save()
    res.json("sucessul")
})


router.delete("/:id",async(req,res)=>{
    await user.findOneAndDelete({_id:req.params.id})
    res.json("it is deleted")


})


module.exports=router;