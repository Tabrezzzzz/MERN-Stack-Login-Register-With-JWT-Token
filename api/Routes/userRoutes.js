const express = require("express");
const router = express.Router();
let {
	loginController,
	registerController,
	tokenController,
} = require("../controllers/userControllers");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      return cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage })

// router.post("/register", () => {
//     console.log("Register API Called")
// });
router.post("/login", loginController);
router.post("/register",upload.single("profileImage"), registerController);
router.post("/verify-token", tokenController);

module.exports = router;