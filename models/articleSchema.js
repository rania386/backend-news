

const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema(
  {
    titre: String,
    contenu: String,
    datePublication : Date,
    categorie: String,
    owner : {type : mongoose.Schema.Types.ObjectId,ref: 'User'} // many 
    //owners : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}] // many 
    
},
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;