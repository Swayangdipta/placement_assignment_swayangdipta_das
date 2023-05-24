const app = require('express')()

const PORT = process.env.PORT || 8000


app.get("/post",async (req,res)=>{
    let posts = ["fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post","fake post",]

    res.status(200).json(posts)
})

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}...`);
})