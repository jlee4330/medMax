const express = require("express");
const {
  createQuestion,
  createAnswer,
  getQuestionsWithAnswersByUserId
} = require("./qnaService");

const router = express.Router();

// 질문 생성 API
router.post("/questions", async (req, res) => {
  const { userId, title, content } = req.body;
  try {
    const questionId = await createQuestion(userId, title, content);
    res.status(201).json({ questionId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create question" });
  }
});

// 답변 생성 API
router.post("/answers", async (req, res) => {
  const { questionId, pharmacistId, answerText } = req.body;
  try {
    await createAnswer(questionId, pharmacistId, answerText);
    res.status(201).json({ message: "Answer created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create answer" });
  }
});

// 특정 사용자에 대한 질문과 답변 조회 API
router.get("/questions-with-answers", async (req, res) => {
  const { userId } = req.query;
  try {
    const questionsWithAnswers = await getQuestionsWithAnswersByUserId(userId);
    res.status(200).json(questionsWithAnswers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions with answers" });
  }
});

module.exports = router;