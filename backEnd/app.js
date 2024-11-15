const express = require('express');
const http = require('http');
const db = require('./src/mysql.js');
const WebSocket = require('ws')
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3001);
app.set("host", process.env.HOST || "0.0.0.0");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server },()=>{
    console.log('서버시작')
})
// Player list 객체 생성
const playerList = {};

// 플레이어 추가 또는 위치 업데이트 함수
function updatePlayerPosition(userId, x, y) {
   console.log(playerList);
    playerList[userId] = { x: x, y: y }; // playerList에 userId를 key로 하여 위치 업데이트
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
   ws.on('message', (data) => {
      const message = data.toString().split(",");
      const command = message[0];
      switch (command){
         case "pos" :
            const its_id = parseInt(message[1]);
            const x = parseFloat(message[2]);
            const y = parseFloat(message[3]);
            updatePlayerPosition(its_id, x, y);
            // console.log('%d의 위치는 x = %f y = %f',its_id,x,y);
            break;
         case "new" :
            const new_id = "newid" + "," + generateUniqueId()
            ws.send(new_id);
            break;
         default:
            break;
      }
      wss.clients.forEach(client => {
         if (client.readyState === WebSocket.OPEN) {
             client.send("allpos" +"/"+ convertPositionListToString(playerList));
         }
      }
   );
   })
   
})
wss.on('listening',()=>{
   console.log('listening on 3001')
})

// 서버 동작중인 표시
server.listen(app.get("port"), app.get("host"), () =>
   console.log(
     "Server is running on : " + app.get("host") + ":" + app.get("port")
   )
);