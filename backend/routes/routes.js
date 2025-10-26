const express=require("express");
const router=express.Router();
const register=require("../auth/signup.js");
const varifinaction=require("../auth/login.js");
const protect = require("../middleware/protectRoute.js");
const profile = require("../controllers/profile.js");
const {fetchAndStoreDisaster} = require("../services/openMeteoService.js");
const {getCoordinates,getCoordinatesForSignup} = require("../middleware/forwardgeocode.js");
const getNearbyDisasters = require("../controllers/getNearbyDisasters.js");

router.post("/api/user/v1/signup",getCoordinatesForSignup,register.singup);
router.post("/api/user/v1/login",varifinaction.logIn);
router.get("/api/user/v1/profile",protect,profile);
router.get("/api/user/v1/fetchdisaster",protect,fetchAndStoreDisaster);
router.post("/api/user/v1/getnearbydisasters",protect,getCoordinates,getNearbyDisasters);


module.exports=router;