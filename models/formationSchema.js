
const mongoose = require("mongoose");
const formationSchema = new mongoose.Schema(
  {
    id_f:String,
    titre:String,
    contenu:String,
    departement:String,

    
    //owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many 
    owners : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}] // many 

  },
  { timestamps: true }
);


const Formation= mongoose.model("formation", formationSchema);
module.exports = Formation;
