const pool = require("../mysql.js");

// 질문 생성
const createQuestion = async (userId, title, content) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO Question (UserId, title, content, created_at, is_answered) VALUES (?, ?, ?, NOW(), false)",
      [userId, title, content]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

// 답변 생성
const createAnswer = async (questionId, userId, pharmacistId, answerContent) => {
  try {
    await pool.query(
      "INSERT INTO Answer (QuestionId, UserId, PharmacistId, content, created_at) VALUES (?, ?, ?, NOW())",
      [questionId, userId, pharmacistId, answerContent]
    );

    // 질문 상태 업데이트
    await pool.query(
      "UPDATE Question SET is_answered = true WHERE QuestionId = ?",
      [questionId]
    );
  } catch (error) {
    console.error("Error creating answer:", error);
    throw error;
  }
};

// 질문과 답변 조회
const getQuestionsWithAnswers = async (userId = null) => {
  try {
    const query = userId
      ? "SELECT * FROM Question WHERE UserId = ?"
      : "SELECT * FROM Question";
    const params = userId ? [userId] : [];

    const [questions] = await pool.query(query, params);
    console.log("Questions fetched from DB:", questions); //sw-디버깅

    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const [answers] = await pool.query(
          "SELECT Answer.content, Pharmacist.PharmacistName " +
          "FROM Answer " +
          "JOIN Pharmacist ON Answer.PharmacistId = Pharmacist.PharmacistId " + 
          "WHERE Answer.QuestionId = ?",
          [question.QuestionId]
        );
        console.log(`Answers for Question ${question.QuestionId}:`, answers); //sw-디버깅

        // 답변 여러개일 시
        const formattedAnswers = answers.map((answer) => ({
          answer: answer.content,
          pharmacist: answer.PharmacistName
        }));

        return {
          id: question.QuestionId,
          question: question.title,
          content: question.content,
          pharmacist: formattedAnswers.length > 0 ? formattedAnswers[0]?.pharmacist : '알 수 없음',
          answer: formattedAnswers.length > 0 ? formattedAnswers[0]?.answer : '알 수 없음'
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
  getQuestionsWithAnswers,
};