const pool = require("../mysql.js");

const getCalender = async (userId) => { // 지난주 일요일부터 오늘까지의 복약 횟수를 가져오는 함수
    try {
        const [result] = await pool.query(
            "SELECT date, mediCount FROM Date_medi WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)",
            [userId]
        );
        return result.map(row => [row.date, row.count]);
    } catch(error) {
        console.error("Error fetching calender:", error);
        throw error;
    }
};

const getThirtyDay = async (userID) => {
    try {
        const [result] = await pool.query(
            "SELECT mediCount, Count(date) AS dateCount FROM Date_medi WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY mediCount ORDER BY mediCount DESC",
            [userId]
        );
        return result.map(row => [row.dateCount, row.mediCount]);
    } catch(error) {
        console.error("Error fetching ThirtyDayMedi:", error);
        throw error;
    }
};

const getSevenDay = async (userID) => {
    try {
        const [result] = await pool.query(
            "SELECT mediCount, Count(date) AS dateCount FROM Date_medi WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY mediCount ORDER BY mediCount DESC",
            [userId]
        );
        return result.map(row => [row.dateCount, row.mediCount]);
    } catch(error) {
        console.error("Error fetching ThirtyDayMedi:", error);
        throw error;
    }
};

module.exports = {
    getCalender,
    getThirtyDay,
};
