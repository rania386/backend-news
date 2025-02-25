




const mongoose = require("mongoose");
const tablenSchema = new mongoose.Schema(
  {
    titre:String,
    contenu:String,
    date_pub:Date,
    categorie : String,
    owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many 
    //owners : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}] // many 
  
},
  { timestamps: true }
);

const Article= mongoose.model("Article", articleSchema);
module.exports = Article;

