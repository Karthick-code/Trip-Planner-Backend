


const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

router.get("/", async (req, res) => {
    const { StartLocation, EndLocation } = req.query;
    console.log("Received query parameters:", { StartLocation, EndLocation });

    try {
        // Query the database with case-insensitive search
        const bus = await Bus.find({
            StartLocation: { $regex: new RegExp(`^${StartLocation}$`, 'i') },
            EndLocation: { $regex: new RegExp(`^${EndLocation}$`, 'i') }
        });

        console.log("Found bus data:", bus);
        
        if (bus.length === 0) {
            res.status(200).json({ message: "No data found" });
        } else {
            res.status(200).json(bus);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: error.message });
    }
});
router.get("/details",async(req,res)=>{
    try{
        const bus=await Bus.find({})
        return res.status(200).json(bus)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
})

module.exports = router;







// const express = require('express');
// const router = express.Router();
// const Bus=require('../models/Bus')

// router.get("/",async(req,res)=>{
//     const {StartLocation,EndLocation}=req.query;
    
//     try{
//         const bus=await Bus.find({StartLocation,EndLocation})
//         res.status(200).json(bus)
//     }catch(error){
//         res.status(500).json({message:error.message})
//     }
// })
// module.exports=router;
