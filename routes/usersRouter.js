var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const upload = require('../middlewares/uploadFile'); 
/* GET users listing. */
router.post('/addUserEmployer', userController.addUserEmployer);
router.post('/addUserAdmin', userController.addUserAdmin);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUsersById/:id', userController.getUsersById);
router.get('/getAllUsersSortByAge',userController.getAllUsersSortByAge); 
router.put('/updateuserById/:id',userController.updateuserById);
router.get('/searchUserByUsername',userController.searchUserByUsername);
router.get('/getAllUsersAge/:age',userController.getAllUsersAge);
router.get('/getAllEmployer',userController.getAllEmployer);
router.get('/getAllAdmin',userController.getAllAdmin);
router.delete('/deleteUserById/:id',userController.deleteUserById); 

router.get('/getAllUsersAgeBetMaxAgeMinAge',userController.getAllUsersAgeBetMaxAgeMinAge);  
router.post('/addUserEmployerWithImg', upload.single("image_user"), userController.addUserEmployerWithImg); 


module.exports = router;