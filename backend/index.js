const express = require("express");
const userRouter = require("./routes/index")
const cors = require("cors");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use(cors());

app.use("/api/v1",userRouter);



app.listen(port,()=>console.log(port));


