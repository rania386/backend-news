var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
/* GET users listing. */
router.post('/addUserEmployer', userController.addUserEmployer);
router.post('/addUserAdmin', userController.addUserAdmin);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUsersById/:id', userController.getUsersById);
router.get('/deleteUserById/:id', userController.deleteUserById);
module.exports = router;