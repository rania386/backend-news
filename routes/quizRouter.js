const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.post("/addQuiz", quizController.addQuiz);
router.get('/getAllQuizzes', quizController.getAllQuizzes);
router.get("/getQuizById/:id", quizController.getQuizById);
router.put("/updateQuiz/:id", quizController.updateQuiz);
router.delete("/deleteQuizById/:id", quizController.deleteQuizById);
router.post("/submitQuiz", quizController.submitQuiz);

module.exports = router;

