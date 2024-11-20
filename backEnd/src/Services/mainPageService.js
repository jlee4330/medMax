const pool = require("../mysql.js");

const getCandidate = async (userId, roomId, timeR) => { // 지난주 일요일부터 오늘까지의 복약 횟수를 가져오는 함수
    try {
        const t = new Date(timeR);
        const time = t.toTimeString().slice(0, 8);;
        const [result] = await pool.query(
            //TODO
            // "Select userID from Day_medi"
            "SELECT dm.UserID " + 
            "FROM Day_medi dm " + 
            "LEFT JOIN Poke p ON dm.UserID = p.To " +
            "WHERE (" +
            `(dm.medicineTime1 BETWEEN DATE_SUB(STR_TO_DATE('${time}', '%H:%i:%s'), INTERVAL 2 HOUR) AND STR_TO_DATE('${time}', '%H:%i:%s') AND dm.medicineCheck1 = FALSE) OR ` +
            `(dm.medicineTime2 BETWEEN DATE_SUB(STR_TO_DATE('${time}', '%H:%i:%s'), INTERVAL 2 HOUR) AND STR_TO_DATE('${time}', '%H:%i:%s') AND dm.medicineCheck2 = FALSE) OR ` +
            `(dm.medicineTime3 BETWEEN DATE_SUB(STR_TO_DATE('${time}', '%H:%i:%s'), INTERVAL 2 HOUR) AND STR_TO_DATE('${time}', '%H:%i:%s') AND dm.medicineCheck3 = FALSE)) ` +
            `AND dm.RoomId = ${roomId} ` +
            "AND NOT EXISTS (" +
            "SELECT 1 " +
            "FROM Poke p2 " +
            `WHERE p2.From = '${userId}' ` +
            "AND p2.To = dm.UserID " +
            `AND p2.When BETWEEN DATE_SUB(STR_TO_DATE('${time}', '%H:%i:%s'), INTERVAL 2 HOUR) AND STR_TO_DATE('${time}', '%H:%i:%s')) ` +
            "GROUP BY dm.UserID"
        );
            //TODO
            return result;


    } catch(error) {
        console.error("Error fetching getCandidate:", error);
        throw error;
    }
};

const getGoal = async (roomId) => {
    try {

        //TODO
        const [result] = await pool.query(
            //TODO
            "SELECT mediCount, Count(date) AS dateCount FROM Date_medi WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY mediCount ORDER BY mediCount DESC",
            [roomId]
            
        );
            //TODO
            return result.map(row => [row.dateCount, row.mediCount]);

    } catch(error) {
        console.error("Error fetching getGoal:", error);
        throw error;
    }
};

const getIds = async (uuID) => {
    try {

        //TODO
        const [result] = await pool.query(
            //TODO
            `SELECT userId, roomId from Day_medi where UserID = '${uuID}'`
        );
            //TODO
            return result.map(row => [row.userId, row.roomId]);

    } catch(error) {
        console.error("Error fetching getGoal:", error);
        throw error;
    }
};

module.exports = {
    getCandidate,
    getGoal,
    getIds
};
