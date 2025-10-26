const { default: axios } = require("axios");

const getCoordinates=async(req,res,next)=>{
    const {address}=req.body;
    try{
        const apikey=process.env.LOCATIONIQ_KEY;
        const endpoint='https://eu1.locationiq.com/v1/search.php';
        const query = address;

        const response=await axios.get(endpoint, {params: {key: apikey,q: query,format: 'json'}});
        console.log(response.data[0]);
        req.location={
            lat:response.data[0].lat,
            lon:response.data[0].lon,
            display_name:response.data[0].display_name,
            place_id:response.data[0].place_id
        }
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message:"error in address geocode"});
    }

}

const getCoordinatesForSignup=async(req,res,next)=>{
    const {address}=req.body.location;
    try{
        const apikey=process.env.LOCATIONIQ_KEY;
        const endpoint='https://eu1.locationiq.com/v1/search.php';
        const query = address;

        const response=await axios.get(endpoint, {params: {key: apikey,q: query,format: 'json'}});
        
        const data = response.data[0];
        // console.log(response.data[0]);
        
        req.body.location = {
            address: data.display_name,
            coordinates: [parseFloat(data.lon), parseFloat(data.lat)],
            place_id: data.place_id
        };

        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message:"error in address geocode"});
    }

}

module.exports={getCoordinates,getCoordinatesForSignup};