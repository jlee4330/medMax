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
app.get('/', (req, res) => {
   const allUsers = pool.query('SELECT * FROM User');
   res.status(200).send(allUsers);
})

const server = http.createServer(app);
const wss = new WebSocket.Server({ server },()=>{
    console.log('서버시작')
})
// Player list 객체 생성
const playerList = {};

// 플레이어 추가 또는 위치 업데이트 함수
function updatePlayerPosition(userId, x, y) {
   // console.log(playerList);
    playerList[userId] = { x: x, y: y }; // playerList에 userId를 key로 하여 위치 업데이트
}

function setRandomPositions(playerList) {
   for (let userID in playerList) {
       if (playerList.hasOwnProperty(userID)) {
           playerList[userID].x = Math.floor(Math.random() * (1 - (-1) + 1)) - 1;
           playerList[userID].y = Math.floor(Math.random() * (1 - (-1) + 1)) - 1;
       }
   }
}

// 플레이어 위치 가져오기 함수
function getPlayerPosition(userId) {
    return playerList[userId] || null; // 존재하지 않으면 null 반환
}

// 플레이어 삭제 함수
function removePlayer(userId) {
    delete playerList[userId];
}

function generateUniqueId() {
   let id;
   let count = 1;

   do {
       id = count;
       count++;
   } while (playerList[id]); // playerList에 같은 id가 있으면 반복

   return id;
}

function convertPositionListToString(positionList) {
   // 모든 key-value 쌍을 map으로 변환하여 각 객체를 형식에 맞게 문자열로 변환
   const result = Object.keys(positionList).map(id => {
       const { x, y } = positionList[id];
       return `${id},${x},${y}`;
   });

   // 각 객체의 문자열을 "/"로 결합하여 최종 문자열 반환
   return result.join('/');
}


wss.on('connection', function connection(ws) {
   const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
          
         wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
               setRandomPositions(playerList)
               console.log(playerList);
                client.send("allpos" +"/"+ convertPositionListToString(playerList));
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
            const n_id = generateUniqueId();
            const new_id = "newid" + "," + n_id;
            updatePlayerPosition(n_id, 0, 0);
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