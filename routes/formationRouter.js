
module.exports = router;
var express = require('express');
var router = express.Router();
const formationController = require('../controllers/formationController');
/* GET home page. */
router.get('/getAllFormations', formationController.getAllFormations );
router.get('/getAllFormationsById/:id', formationController.getAllFormationsById );
router.post('/addFormations', formationController.addFormations );
router.put('/affect', formationController.affect );
router.put('/desaffect', formationController.desaffect );
router.put('/updateFormations/:id', formationController.updateFormations );
router.delete('/deleteFormationsById/:id', formationController.deleteFormationsById ); 

module.exports = router;


