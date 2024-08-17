const mongoose = require('mongoose');
const busSchema=new mongoose.Schema({
    RouteName:String,
    StartLocation:String,
    EndLocation:String,
    StopLocations:[String],
    Schedule:String,
    BusOperator:String
})
module.exports=mongoose.model("Bus",busSchema)
