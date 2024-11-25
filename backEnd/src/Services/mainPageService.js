const pool = require("../mysql.js");

const getCandidate = async (userId, roomId, timeR) => { // 지난주 일요일부터 오늘까지의 복약 횟수를 가져오는 함수
    try {
        const t = new Date(timeR);
        const time = t.toTimeString().slice(0, 8);;
        const [result] = await pool.query(

            "SELECT dm.UserID " + 
            "FROM Date_medi dm " + 
            "LEFT JOIN Poke p ON dm.UserID = p.poketo " +
            "WHERE (" +
            `(dm.medicineTime1 BETWEEN DATE_SUB(STR_TO_DATE('${time}', '%H:%i:%s'), INTERVAL 2 HOUR) AND STR_TO_DATE('${time}', '%H:%i:%s') AND dm.medicineCheck1 = FALSE) OR ` +
            `(dm.medicineTime2 BETWEEN DATE_SUB(STR_TO_DATE('${time}', '%H:%i:%s'), INTERVAL 2 HOUR) AND STR_TO_DATE('${time}', '%H:%i:%s') AND dm.medicineCheck2 = FALSE) OR ` +
            `(dm.medicineTime3 BETWEEN DATE_SUB(STR_TO_DATE('${time}', '%H:%i:%s'), INTERVAL 2 HOUR) AND STR_TO_DATE('${time}', '%H:%i:%s') AND dm.medicineCheck3 = FALSE)) ` +
            `AND dm.RoomId = ${roomId} ` +
            "AND NOT EXISTS (" +
            "SELECT 1 " +
            "FROM Poke p2 " +
            `WHERE p2.pokefrom = '${userId}' ` +
            "AND p2.poketo = dm.UserID " +
            `AND p2.When BETWEEN DATE_SUB(STR_TO_DATE('${time}', '%H:%i:%s'), INTERVAL 2 HOUR) AND STR_TO_DATE('${time}', '%H:%i:%s')) ` +
            "GROUP BY dm.UserID"
        );
            
            return result;


    } catch(error) {
        console.error("Error fetching getCandidate:", error);
        throw error;
    }
};


const getIds = async (uuID) => {
    try {

        
        const [result] = await pool.query(
            
            `SELECT userId, roomId from User where UserID = '${uuID}'`
        );
            
            return result.map(row => [row.userId, row.roomId]);

    } catch(error) {
        console.error("Error fetching getGoal:", error);
        throw error;
    }
};

const poke = async (ufrom, uto, when) => {
    try {

        
        const [result] = await pool.query(
            
            'INSERT INTO poke (`pokefrom`, `poketo`, `when`) VALUES (?, ?, ?);',
            [ufrom, uto, (new Date(when)).toTimeString().slice(0,8)]
        );
            
            return {message: "poke success"};

    } catch(error) {
        console.error("Error fetching getGoal:", error);
        throw error;
    }
};

const eatMed = async (userId, time) => {
    try {

        
        const [result] = await pool.query(
            
            `
UPDATE Date_medi
SET 
    medicineCheck1 = CASE 
                        WHEN medicineTime1 = '${(new Date(time)).toTimeString().slice(0,8)}' THEN TRUE 
                        ELSE medicineCheck1 
                    END,
    medicineCheck2 = CASE 
                        WHEN medicineTime2 = '${(new Date(time)).toTimeString().slice(0,8)}' THEN TRUE 
                        ELSE medicineCheck2 
                    END,
    medicineCheck3 = CASE 
                        WHEN medicineTime3 = '${(new Date(time)).toTimeString().slice(0,8)}' THEN TRUE 
                        ELSE medicineCheck3 
                    END
WHERE UserID = '${userId}';
`
        );
            
            return {message: "eatMed success"};

    } catch(error) {
        console.error("Error fetching getGoal:", error);
        throw error;
    }
};


const signUp = async (userId, roomId, time1, time2, time3) => {

    try {
        const query = `
            INSERT INTO User (UserID, UserName, RoomId, numMedi, time_first, time_second, time_third)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
    const values = [
        userId,            // UserID
        userId,            // NickName (UserID와 동일)
        roomId,            // RoomId
        null,              // Date
        (new Date(time1)).toTimeString().slice(0,8),             // medicineTime1
        (new Date(time2)).toTimeString().slice(0,8),             // medicineTime2
        (new Date(time3)).toTimeString().slice(0,8),             // medicineTime3
    ];
        
        await pool.query(
            
            query, values
        );

    } catch(error) {
        console.error("Error fetching getGoal:", error);
        throw error;
    }
    try {
        const query = `
  INSERT INTO Date_medi (UserID, mediDate, mediCount, RoomId, medicineTime1, medicineTime2, medicineTime3, medicineCheck1, medicineCheck2, medicineCheck3)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
const values = [
    userId,            // UserID
    null,          // NickName (UserID와 동일)
    null,            // RoomId
    roomId,         // Date
    (new Date(time1)).toTimeString().slice(0,8),             // medicineTime1
    (new Date(time2)).toTimeString().slice(0,8),             // medicineTime2
    (new Date(time3)).toTimeString().slice(0,8),             // medicineTime3
    false,             // medicineCheck1
    false,             // medicineCheck2
    false              // medicineCheck3
  ];
        
        await pool.query(
            
            query, values
        );
            
            return {userID: userId, roomID: roomId }

    } catch(error) {
        console.error("Error fetching getGoal:", error);
        throw error;
    }
   
};

const getUsers = async () => {
    try {

        const query = `
  SELECT RoomId, GROUP_CONCAT(UserID) AS UserIDs
  FROM User
  GROUP BY RoomId;
`;  
        
        const [result] = await pool.query(
            
            query
        );
            console.log(result);
            return result;

    } catch(error) {
        console.error("Error fetching getGoal:", error);
        throw error;
    }
};

const getRIdMedTime = async (userId) => {
    try {

        const query = `
  Select RoomId, time_first, time_second, time_third from User where UserId = '${userId}'
`;  
        
        const [result] = await pool.query(
            
            query
        );
            console.log(result);
            return result;

    } catch(error) {
        console.error("Error fetching getGoal:", error);
        throw error;
    }
};

const progre = async (roomID) => {
    try {

        const query = `
  WITH LatestRecords AS (
    SELECT 
        RecordID, 
        UserID, 
        RoomID,
        medicineCheck1,
        medicineCheck2,
        medicineCheck3
    FROM Date_medi
    WHERE (UserID, RecordID) IN (
        SELECT 
            UserID, 
            MAX(RecordID) AS MaxRecordID
        FROM Date_medi
        GROUP BY UserID
    )
)
SELECT 
    SUM(medicineCheck1 + medicineCheck2 + medicineCheck3) AS TotalCheck
FROM LatestRecords
WHERE RoomID = ${roomID};
`;  
        
        const [result] = await pool.query(
            query
        );
            
            return result;

    } catch(error) {
        console.error("Error fetching getGoal:", error);
        throw error;
    }
};
// const getIds = async (uuID) => {
//     try {

//         //TODO
//         const [result] = await pool.query(
//             //TODO
//             `SELECT userId, roomId from Date_medi where UserID = '${uuID}'`
//         );
//             //TODO
//             return result.map(row => [row.userId, row.roomId]);

//     } catch(error) {
//         console.error("Error fetching getGoal:", error);
//         throw error;
//     }
// };

module.exports = {
    getCandidate,
    getIds,
    signUp,
    getUsers,
    poke,
    eatMed,
    progre,
    getRIdMedTime
};
