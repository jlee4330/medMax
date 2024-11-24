const express = require("express");
const {
  createQuestion,
  createAnswer,
  getQuestionsWithAnswers
} = require("../Services/qnaService");

const qnaRouter = express.Router();

// 질문 생성 API
qnaRouter.post("/questions", async (req, res) => {
  const { userId, title, content } = req.body;
  try {
    const questionId = await createQuestion(userId, title, content);
    res.status(201).json({ questionId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create question" });
  }
});

// 답변 생성 API
qnaRouter.post("/answers", async (req, res) => {
  const { questionId, pharmacistId, answerText } = req.body;
  try {
    await createAnswer(questionId, pharmacistId, answerText);
    res.status(201).json({ message: "Answer created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create answer" });
  }
});

// 질문과 답변 조회 API
qnaRouter.get("/all-qnas", async (req, res) => {
  const { userId } = req.query;
  console.log("Received userId:", userId); //sw-디버깅
  try {
    const questionsWithAnswers = await getQuestionsWithAnswers(userId || null);
    res.status(200).json(questionsWithAnswers);
  } catch (error) {
    console.error("Error in all-qnas route:", error); //sw-디버깅
    res.status(500).json({ error: "Failed to fetch questions with answers" });
  }
});

module.exports = qnaRouter;