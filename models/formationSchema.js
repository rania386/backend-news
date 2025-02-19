
const mongoose = require("mongoose");
const formationSchema = new mongoose.Schema(
  {
    id_f:String,
    titre:String,
    contenu:String,
    departement:String,
  },
  { timestamps: true }
);


const formation= mongoose.model("formation", formationSchema);
module.exports = formation;
