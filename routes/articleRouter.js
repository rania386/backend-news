var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');

/* GET home page. */
router.get('/getAllArticles', articleController.getAllArticles );
router.get('/getArticleById/:id', articleController.getArticleById );
router.post('/addArticle', articleController.addArticle );
router.put('/updateArticle/:id', articleController.updateArticle);
router.delete('/deleteArticleById/:id', articleController.deleteArticleById);
router.put('/affect', articleController.affect);

module.exports = router;