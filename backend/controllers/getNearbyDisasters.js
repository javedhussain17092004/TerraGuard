const mongoose=require("mongoose");
const DisasterEvent=require("../models/disaster.js");

const getNearbyDisasters=async(req,res)=>{
    if (req.location) {
      // When user sends an address in request body
      lat = parseFloat(req.location.lat);
      lon = parseFloat(req.location.lon);
      alerts = req.user.preferences.alerts;
    } else {
      // Fallback to user's saved coordinates in DB
      const { coordinates } = req.user.location;
      lat = coordinates[1];
      lon = coordinates[0];
      alerts = req.user.preferences.alerts;
    }
    const preferences = req.user?.preferences || { alerts: {} };
    try{
        const disasters = await DisasterEvent.find({
                "location.coordinates": {
                    $nearSphere: {
                        $geometry: { 
                            type: "Point", 
                            coordinates: [lon, lat],
                        },
                    $maxDistance: 100000 // 100 km in meters
                }
            },
            type: { $in: Object.keys(preferences.alerts).filter(key => preferences.alerts[key]) }
        }).sort({ date: -1 });

        console.log(disasters);
        res.status(200).json({message:"data fetch successfully",disasters});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"error in getnearbydisaster"});
    }
}

module.exports=getNearbyDisasters;