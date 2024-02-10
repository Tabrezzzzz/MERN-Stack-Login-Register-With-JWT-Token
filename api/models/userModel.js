const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    profileImage:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
      },

})

const user = mongoose.model("myProfileUser", userSchema)
module.exports = user