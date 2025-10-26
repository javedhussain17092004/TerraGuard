const cron=require("node-cron");
const {fetchAndStoreDisasterData}=require("../services/openMeteoService");
const DisasterEvent=require("../models/disaster.js");
const User=require("../models/user.js");

const runDisasterJob=async()=>{
    try{
        const users=await User.find({});
        const currOff=new Date(Date.now()-30*24*60*60*1000);
        const remainsData=await DisasterEvent.deleteMany({ date: { $lt: currOff } });

        for(let user of users){
            if(user.location.coordinates[0] && user.location.coordinates[1] && user.location.address){
                let lon=user.location.coordinates[0];
                let lat=user.location.coordinates[1];
                let address=user.location.address;
                await fetchAndStoreDisasterData(lon,lat,address).catch((err)=>{
                    console.log("error in data fetch in 3hr users history");
                });
            }
        }
        console.log(`[CRON] Disaster data updated for all users `);
    }catch(err){
        console.log("error in disaster jon",err);
    }
}

cron.schedule("0 */3 * * *",async()=>{
    console.log(`[CRON] Running disaster job at ${new Date().toISOString()}`);
    await runDisasterJob();
});

module.exports=runDisasterJob;