import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send({
        status: true,
        message : 'Hello World'
    })
})

mongoose.set("strictQuery", false);
mongoose
  .connect((process.env.DB_URI))
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT,()=>{
    console.log(`Running at http://localhost:${process.env.PORT}`);
})