const express = require('express')
const app = express()
const io = require('socket.io')(3001, {cors : {
  origin: ['http://localhost:8080'],
}
})

io.on("connection", socket => {
  console.log(socket.id)
})







app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/test/:id', function (req, res) {
    const q = req.params
    console.log(q)
    res.send(q.id)
  })

app.get('/sound/:name', function (req, res) {
    const { name } = req.params
    const sounds = {
        "cat": "야옹",
        "dog": "멍멍",
        "pig": "꿀꿀"
    }
    res.send(sounds[name])
  })

app.listen(3000)