const express = require('express');
const http = require('http');
const db = require('./src/mysql.js');
const WebSocket = require('ws')
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const qnaRouter = require('./src/Routers/qnaRouter');
const myPageRouter = require('./src/Routers/myPageRouter');
const mainPageRouter = require('./src/Routers/mainPageRouter');
const pool = require("./src/mysql.js");
const {getUsers } = require("./src/Services/mainPageService");

dotenv.config();

const app = express();

app.set("port", 7777);
app.set("host", "0.0.0.0");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router
app.use('/qna', qnaRouter);
app.use('/myPage', myPageRouter);
app.use('/mainPage', mainPageRouter);

// test
app.get('/', async (req, res) => {
   try {
     const [allUsers] = await pool.query('SELECT * FROM User');
     res.status(200).json(allUsers);
   } catch (error) {
     console.error('Error fetching users:', error);
     res.status(500).json({ message: 'Internal Server Error' });
   }
 });

const server = http.createServer(app);
const wss = new WebSocket.Server({ server },()=>{
    console.log('서버시작')
})
// Player list 객체 생성
// const playerListList = {};
// const playerList = {};

// // 플레이어 추가 또는 위치 업데이트 함수
// function updatePlayerPosition(playerList, userId, x, y) {
//    // console.log(playerList);
//     playerList[userId] = { x: x, y: y }; // playerList에 userId를 key로 하여 위치 업데이트
// }

// function setRandomPositions(playerList) {
//    for (let userID in playerList) {
//        if (playerList.hasOwnProperty(userID)) {
//            playerList[userID].x = Math.floor(Math.random() * (1 - (-1) + 1)) - 1;
//            playerList[userID].y = Math.floor(Math.random() * (1 - (-1) + 1)) - 1;
//        }
//    }
// }
const playerListList = {};

async function processQueryData(){ //Insert players into PlayerListList
    const queryResult = await getUsers();
    queryResult.forEach(({ RoomId, UserIDs }) => {
        // UserIDs를 쉼표로 나누어 배열로 변환
        const userIdArray = UserIDs.split(',');
      
        userIdArray.forEach((userId) => {
         
          const x = 0; 
          const y = 0; 
      
          // insertPlayerPosition 함수 호출
          insertPlayerPosition(RoomId, userId, x, y);
        });
      });
}

processQueryData();



/**
 * 플레이어의 위치를 업데이트하는 함수
 * @param {number} roomID - 방 ID
 * @param {number} UserID - 사용자 ID
 * @param {number} x - x 좌표
 * @param {number} y - y 좌표
 */
function updatePlayerPosition(roomID, UserID, x, y) {
    if (playerListList[roomID] && playerListList[roomID][UserID]) {
        playerListList[roomID][UserID] = { x, y };
    } else {
        console.log(`Error: Player ${UserID} does not exist in room ${roomID}`);
    }
}

/**
 * 플레이어 위치를 삽입하는 함수
 * @param {number} roomID - 방 ID
 * @param {string} UserID - 사용자 ID
 * @param {number} x - x 좌표
 * @param {number} y - y 좌표
 */
function insertPlayerPosition(roomID, UserID, x, y) {
    if (!playerListList[roomID]) {
        playerListList[roomID] = {}; // 방을 초기화
    }
    if (!playerListList[roomID][UserID]) {
        playerListList[roomID][UserID] = { x, y };
    } else {
        console.log(`Error: Player ${UserID} already exists in room ${roomID}`);
    }
}

/**
 * 모든 플레이어의 위치를 랜덤으로 설정하는 함수
 */
function setRandomPosition() {
    for (const roomID in playerListList) {
        for (const UserID in playerListList[roomID]) {
            const x = Math.floor(Math.random() * 3) - 1; // 0 ~ 99 사이의 랜덤 값
            const y = Math.floor(Math.random() * 3) - 1; // 0 ~ 99 사이의 랜덤 값
            playerListList[roomID][UserID] = { x, y };
        }
    }
}
function generateUniqueUserID() {
   const existingIDs = new Set();

   // 모든 roomID와 userID를 순회하며 기존 ID를 수집
   for (const roomID in playerListList) {
       for (const userID in playerListList[roomID]) {
           existingIDs.add(Number(userID)); // userID를 숫자로 변환하여 저장
       }
   }

   // 사용 가능한 가장 작은 정수를 찾기
   let newUserID = 1; // 시작값
   while (existingIDs.has(newUserID)) {
       newUserID++;
   }

   return newUserID;
}

// function convertPositionListToString(positionList) {
//    // 모든 key-value 쌍을 map으로 변환하여 각 객체를 형식에 맞게 문자열로 변환
//    const result = Object.keys(positionList).map(id => {
//        const { x, y } = positionList[id];
//        return `${id},${x},${y}`;
//    });

//    // 각 객체의 문자열을 "/"로 결합하여 최종 문자열 반환
//    return result.join('/');
// }

function convertPlayerListListToString(playerListList) {
   // 각 roomID의 데이터를 변환
   const result = Object.keys(playerListList).map(roomID => {
       const positionList = playerListList[roomID];
       const playerData = Object.keys(positionList).map(userID => {
           const { x, y } = positionList[userID];
           return `${userID},${x},${y}`;
       }).join('/'); // 각 플레이어의 데이터를 "/"로 결합

       return `${roomID}#${playerData}`;
   });

   // 각 room의 데이터를 "&"로 결합하여 최종 문자열 반환
   return result.join('&');
}

wss.on('connection', function connection(ws) {
   const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
          
         wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
               setRandomPosition()
               const temp = convertPlayerListListToString(playerListList);
               console.log(temp);
               client.send("allpos" +"/"+ temp);
            }
         }
      );

      }
  }, 500); // 5000ms (5초) 간격으로 전송
   ws.on('message', (data) => {
      const message = data.toString().split(",");
      const command = message[0];
      switch (command){
         case "pos" :
            const its_id = parseInt(message[1]);
            const x = parseFloat(message[2]);
            const y = parseFloat(message[3]);
            // console.log('%d의 위치는 x = %f y = %f',its_id,x,y);
            break;
         case "new" :
            const n_id = message[1];
            const room_id = message[2];
            const new_id = "newid" + "," + n_id;
            insertPlayerPosition(room_id, n_id, 0, 0);
            ws.send(new_id);
            break;
         default:
            break;
      }
      
   }
   
)
   
})
wss.on('listening',()=>{
   console.log('listening on 7777')
})

// 서버 동작중인 표시
server.listen(app.get("port"), app.get("host"), () =>
   console.log(
     "Server is running on : " + app.get("host") + ":" + app.get("port")
   )
);
