var express = require("express");
var router = express.Router();
const pdfController = require("../controllers/pdfController");
const uploadfile = require("../middlewares/uploadFile");

router.post("/uploadPdf", uploadfile.single("pdf"), pdfController.uploadPdf);
router.get("/getPdfsByChapitre/:chapitreId", pdfController.getPdfsByChapitre);

module.exports = router;
