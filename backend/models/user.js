const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    password:{
        type:String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    location: {
        address:{
          type:String,
          default:""
        },
        coordinates: { type: [Number], default: [0, 0] }, // [lon, lat]
    },
    preferences: {
      language: { type: String, default: "en" },
      alerts: {
        fire: { type: Boolean, default: true },
        flood: { type: Boolean, default: true },
        cyclone: { type: Boolean, default: true },
      },
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DisasterEvent", // link to your satellite data model
      },
    ],
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
},
    { timestamps: true }
);

userSchema.index({ "location.coordinates": "2dsphere" });

const User=mongoose.model("User",userSchema);

module.exports=User;