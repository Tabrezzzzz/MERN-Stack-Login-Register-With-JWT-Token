const dotenv = require("dotenv");
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const user = require("./models/userModel")

let {connectDatabase} = require("./config/config")

// dotenv config 
dotenv.config()

// configure express 
const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// connect database 
connectDatabase()

// // delete all user Data 
// let destroyUsers = async () => {
//     try{
//     let res = await user.deleteMany()
//     console.log(res)
//     }catch(err){
//         console.log(err)
//     }
// }
// destroyUsers()


// creating base API 
app.use("/api/user", require('./Routes/userRoutes'))
app.get("/uploads/:name", (req, res, next) => {
    let filename = req.params.name
    res.sendFile(filename, { root: "uploads" });
  });


const server = app.listen(8080, () =>{
  console.log(server.address().address)
    console.log("port is running on 8080")
})

console.log("started")