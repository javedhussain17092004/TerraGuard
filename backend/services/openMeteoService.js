const axios=require("axios");
const DisasterEvent=require("../models/disaster.js");

const fetchAndStoreDisasterData=async(lon,lat,address)=>{
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,precipitation_sum,wind_speed_10m_max&timezone=auto`;
    try{
        const response=await axios.get(url);
        console.log(response.data.daily);
        const dailyData = response.data.daily;
        let storedCount = 0;

        for(let i=0;i<dailyData.time.length;i++){
            const temp = dailyData.temperature_2m_max[i];
            const rain = dailyData.precipitation_sum[i];
            const wind = dailyData.wind_speed_10m_max[i];

            let type=null;
            if (rain > 50) type = "flood";
            else if (temp > 45) type = "fire";
            else if (wind > 30) type = "cyclone";

            if(type){
                const event=new DisasterEvent({
                    type:type,
                    source: "OpenMeteo",
                    location: { coordinates: [lon, lat],address:address},
                    severity: Math.max(rain, temp, wind),
                    date: new Date(dailyData.time[i]),
                    metrics: { temperature: temp, precipitation: rain, windSpeed: wind },
                    description: `${type} risk at (${lat}, ${lon})`
                });

                await event.save();
                storedCount++;
            }
        }

        // return res.status(200).json({ message: "Disaster events stored successfully", count: storedCount ,req:req.user.location});
        return storedCount;
    }catch(err){
        console.log(err);
        res.status(500).json({message:"error in openMetoService"});
    }

}

const fetchAndStoreDisaster=async(req,res)=>{
    const {coordinates,address}=req.user.location;
    try{
        const response=await fetchAndStoreDisasterData(coordinates[0],coordinates[1],address);
        console.log(response);
        res.status(200).json({ message: "Data fetched successfully", response });
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"error in fetch and store disaster"});
    }
}

module.exports = { fetchAndStoreDisaster, fetchAndStoreDisasterData };

