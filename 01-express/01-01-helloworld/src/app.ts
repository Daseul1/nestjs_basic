// const express = require('express')
import * as express from 'express'

// const app = express()
const app: express.Express = express(); // const app: express.Express -> app의  타입 지정 
// app 은 express 의 인스턴스로써 서버 역할을 함


const port: number = 8000

// req, res 는 express의 req 와 res 인 것.
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!') // String 형식으로 보냄
})

// 하나의 라우터 
app.get("/hello-world", (req: express.Request, res: express.Response) => {
  res.send({ hello: "world" }); // JSON 객체 형식으로 내보내면 키-벨류로 이루어진 객체 값으로 반환됨
});


app.post("/person", (req: express.Request, res: express.Response) => {
  res.send({ person: "choi" , age: 10, friends: ['ss', 'yy']});
});

// listen : 서버를 열어주는 역할
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


