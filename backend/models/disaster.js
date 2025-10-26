const mongoose=require("mongoose");

const disasterEventSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:["flood","fire","cyclone"],
        required:true,
    },
    source: {
        type: String,
        enum: ["OpenMeteo", "NOAA", "NASA"],
        required: true
    },
    location: {
        // type: { type: String, enum: ["Point"], default: "Point" }, // GeoJSON type
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        },
        address: { type: String, default: "" }
    },
    severity: { // 0-100 scale (optional)
        type: Number, 
        default: 0 
    }, 
    date: { 
        type: Date, 
        required: true 
    },
    metrics: {
        temperature: Number,       // optional, e.g., for fire risk
        precipitation: Number,     // e.g., for flood
        windSpeed: Number           // e.g., for cyclone
    },
  description: { type: String, default: "" }
},
    {timestamps:true}
);

disasterEventSchema.index({ "location.coordinates": "2dsphere" });

const DisasterEvent=mongoose.model("DisasterEvent",disasterEventSchema);

module.exports=DisasterEvent;