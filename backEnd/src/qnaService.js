const pool = require("./db");

// 질문 생성 함수
const createQuestion = async (userId, title, content) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO Question (user_id, title, content, created_at, is_answered) VALUES (?, ?, ?, NOW(), false)",
      [userId, title, content]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

// 답변 생성 함수
const createAnswer = async (questionId, pharmacistId, answerText) => {
  try {
    await pool.query(
      "INSERT INTO Answer (question_id, pharmacist_id, answer_text, created_at) VALUES (?, ?, ?, NOW())",
      [questionId, pharmacistId, answerText]
    );

    // 질문 상태 업데이트
    await pool.query(
      "UPDATE Question SET is_answered = true WHERE id = ?",
      [questionId]
    );
  } catch (error) {
    console.error("Error creating answer:", error);
    throw error;
  }
};

// 질문과 답변 조회 함수
const getQuestionsWithAnswersByUserId = async (userId) => {
  try {
    const [questions] = await pool.query(
      "SELECT * FROM Question WHERE user_id = ?",
      [userId]
    );

    // 각 질문에 대한 답변을 추가
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const [answers] = await pool.query(
          "SELECT * FROM Answer WHERE question_id = ?",
          [question.id]
        );
        return {
          ...question,
          answers: answers
        };
      })
    );

    return questionsWithAnswers;
  } catch (error) {
    console.error("Error fetching questions with answers:", error);
    throw error;
  }
};

module.exports = {
  createQuestion,
  createAnswer,
  getQuestionsWithAnswersByUserId,
};