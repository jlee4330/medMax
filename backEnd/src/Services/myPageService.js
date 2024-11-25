const { get } = require("http");
const pool = require("../mysql.js");

const getUserNumMedi = async (userId) => {
    try {
        const [result] = await pool.query(
            "SELECT numMedi FROM User WHERE userId = ?",
            [userId]
        );
        return result.map(row => [row.numMedi]);
    } catch(error) {
        console.error("Error fetching numMedi:", error);
        throw error;
    }
};

const getUserName = async (userId) => {
    try {
        const [result] = await pool.query(
            "SELECT UserName FROM User WHERE userId = ?",
            [userId]
        );
        return result.map(row => [row.UserName]);
    } catch(error) {
        console.error("Error fetching UserName:", error);
        throw error;
    }
};

const getCalender = async (userId) => { // 지난주 일요일부터 오늘까지의 복약 횟수를 가져오는 함수
    try {
        const [result] = await pool.query(
            "SELECT DATE_FORMAT(mediDate, '%d') AS mediDate, mediCount FROM Date_medi WHERE userId = ? AND mediDate >= DATE_SUB(CURDATE(), INTERVAL (CASE WHEN WEEKDAY(CURDATE()) = 6 THEN 7 ELSE WEEKDAY(CURDATE()) + 8 END) DAY) AND mediDate <= CURDATE()",
            [userId]
        );
        return result.map(row => [parseInt(row.mediDate, 10), row.mediCount]);
    } catch(error) {
        console.error("Error fetching calender:", error);
        throw error;
    }
};

const getThirtyDay = async (userId) => {
    try {
        const [result] = await pool.query(
            "SELECT mediCount, Count(mediDate) AS mediDateCount FROM Date_medi WHERE userId = ? AND mediDate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND mediDate <= CURDATE() GROUP BY mediCount ORDER BY mediCount DESC",
            [userId]
        );
        return result.map(row => [row.mediCount, row.mediDateCount]);
    } catch(error) {
        console.error("Error fetching ThirtyDayMedi:", error);
        throw error;
    }
};

const getSevenDay = async (userId) => {
    try {
        const [result] = await pool.query(
            "SELECT mediCount, Count(mediDate) AS mediDateCount FROM Date_medi WHERE userId = ? AND mediDate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND mediDate <= CURDATE() GROUP BY mediCount ORDER BY mediCount DESC",
            [userId]
        );
        return result.map(row => [row.mediCount, row.mediDateCount]);
    } catch(error) {
        console.error("Error fetching SevenDayMedi:", error);
        throw error;
    }
};

const getTogetherMedi = async (userId) => {
    try {
        const [result] = await pool.query(
            "SELECT COUNT(mediDate) AS mediDateCount FROM Date_medi WHERE userId = ? AND mediCount >= 1",
            [userId]
        );
        return result.map(row => [row.mediDateCount]);
    } catch(error) {
        console.error("Error fetching TogetherMedi:", error);
        throw error;
    }
}

const getFullMedi = async (userId) => {
    try {
        const [result] = await pool.query(
            "SELECT Count(mediDate) AS mediDateCount FROM Date_medi WHERE userId = ? AND mediCount = (SELECT numMedi FROM User WHERE userId = ?)",
            [userId, userId]
        );
        return result.map(row => [row.mediDateCount]);
    } catch(error) {
        console.error("Error fetching FullMedi:", error);
        throw error;
    }
}

const getQNum = async (userId) => {
    try {
        const [result] = await pool.query(
            "SELECT COUNT(QuestionId) AS qNum FROM Question WHERE userId = ?",
            [userId]
        );
        return result.map(row => [row.qNum]);
    } catch(error) {
        console.error("Error fetching QNum:", error);
        throw error;
    }
}

const getPokers = async (userId) => {
    try {
        const [result] = await pool.query(
            "SELECT userName, COUNT(PokeID) AS pokeNum FROM poke, User WHERE poketo = ? AND userId = pokefrom GROUP BY pokefrom",
            [userId]
        );
        return result.map(row => [row.userName, row.pokeNum]);
    } catch(error) {
        console.error("Error fetching Pokes:", error);
        throw error;
    }
}

module.exports = {
    getUserNumMedi,
    getUserName,
    getCalender,
    getThirtyDay,
    getSevenDay,
    getTogetherMedi,
    getFullMedi,
    getQNum,
    getPokers
};
