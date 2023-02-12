import express from 'express';

const pageNotFound = express.Router();

pageNotFound.all('/',(req,res)=>{
    console.log("Error");
    res.redirect("http://localhost:5173/src/views/error.html")
    // res.status(404).json({
    //     success:false,
    //     message:"The page you are looking for does not exist!!!"
    // })
})

export default pageNotFound;