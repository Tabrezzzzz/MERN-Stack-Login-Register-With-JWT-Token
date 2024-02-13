const user = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer  = require('multer')



let registerController = async (req , res) => {
    let profile;
  if(req.file){
    profile = req.file.filename;
  }else{
    profile=null
  }

    try{
        let {name, email, phoneNumber, profileImage, password} = req.body;
        let emailExist = await  user.findOne({email: email});
        let phoneNumberExist = await  user.findOne({phoneNumber: phoneNumber});
         if(emailExist){
             return res.status(409).send('Email already exist');
         }else if(phoneNumberExist){
            return res.status(409).send('Phone Number already exist');
        }else{
            let newUser = await new user({
                name,
                email,
                phoneNumber,
                profileImage: profile,
                password : bcrypt.hashSync(password ,8)
            })
            await newUser.save()
            res.json({data: {
                message:"user registered successfully",
                user :  newUser
            }}, 201)
        }

}catch(error){
console.log(error)
}
}

let loginController = async (req , res) => {
    try{
      console.log(req.body)
        let {email , password}= req.body;
        let emailExist  = await user.findOne({email})
        console.log(emailExist)
        if(!emailExist){
            res.json({message: "Invalid Email"})
        }
        
        let  isMatch = await bcrypt.compare(password, emailExist.password)
        if(!isMatch){
            res.json({message: 'Password is Incorrect'})
        }else{
            const token = jwt.sign({ _id: emailExist._id }, process.env.PROFILE_LOGIN_JWT_SECRET, {
                expiresIn: "3000s",
              });
            res.json({
                token, 
                message: 'User Logged in successfully'}, 200)       
        }

    }catch(error){
        console.log(error)
    }
}

let tokenController = async (req, res) => {
    try {
        if (req.headers.authorization) {
        console.log(req.headers.authorization)
          // Get token from header
          const token = req.headers.authorization.split(" ")[1];
          // Verify token
          const decode = jwt.verify(token, process.env.PROFILE_LOGIN_JWT_SECRET);
          // Attach token with request
          req.user = decode;
          let authUser = await user.findOne({_id : req.user._id});
          res.json({
            authUser,
            message: "Valid JWT Token"}, 200)
        } else {
          res.status(201).json({ message: "Unauthorized" });
        }
      } catch{
        res.status(201).json({ message: "Unauthorized" });
      }
}

let isAuth = async (req, res, next) => {
  try {
      if (req.headers.authorization) {
      console.log(req.headers.authorization)
        // Get token from header
        const token = req.headers.authorization.split(" ")[1];
        // Verify token
        const decode = jwt.verify(token, process.env.PROFILE_LOGIN_JWT_SECRET);
        // Attach token with request
        req.user = decode;
        let authUser = await user.findOne({_id : req.user._id});
        if(authUser){
          next()
        } 
      } else {
        res.status(201).json({ message: "Unauthorized" });
      }
    } catch{
      res.status(201).json({ message: "Unauthorized" });
    }
}


let updateController = async (req, res) => {
  let  id = req.params.id
  let updateUser = await user.findOne({_id : id});
  let profile
  if(req.file){
    console.log(req.body.profileImage)
    if(req.file){
      profile = req.file.filename;
    }else{
      profile=null
    }
  }
let {name, email, profileImage, phoneNumber,} = req.body
updateUser = await user.findByIdAndUpdate(id, {
  name,
  email,
  phoneNumber,
  profileImage: profile,
  password: updateUser.password
}, {new: true});
  res.json({message:"User Updated Successfully", updateUser}, 200)
}

module.exports = {
    loginController,
    registerController,
    tokenController,
    updateController,
    isAuth
}