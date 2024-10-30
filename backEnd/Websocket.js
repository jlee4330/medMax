const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 7777 },()=>{
    console.log('서버시작')
})
wss.on('connection', function connection(ws) {
   ws.on('message', (data) => {
      const message = data.toString().split(",");
      const x = message[0];
      const y = message[1];
      console.log('데이터 : \n x = %o, y = %o', x,y);
      ws.send(data);
   })
})
wss.on('listening',()=>{
   console.log('listening on 7777')
})