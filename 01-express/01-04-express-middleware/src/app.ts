import * as express from "express";
import { Cat } from './app.model'

const app: express.Express = express();
const port: number = 8000;

// 데이터 모킹 : 실제 데이터가 아니라 개발자가 필요에 의해 만든 데이터
const data = [1 ,2, 3, 4]


/**
 * 어디서 요청을 보냈는지 확인을 매번 하고 싶은데, 
 * api 별로 콘솔을 찍게 된다면 비효율적.
 * 따라서, API가 실행되기 전에 먼저 실행될 미들웨어 함수를 만들어서 관리해 줄 것.
 */

// 전체적인 라우터에 해당하는 미들웨어는 use 메서드를 사용하여 만들수 있음
app.use((req, res, next) => {
  console.log(req.rawHeaders[1])
  console.log('this is logging middleware');
  next() // 미들웨어를 만난 후, 다음 라우터가 실행되기 위해서 next() 사용
})

// 해당하는 라우터의 미들웨어 생성
app.get('/cats/blue',(req, res, next) => {
  console.log('this is blue middleware');
  next() // 미들웨어를 만난 후, 다음 라우터가 실행되기 위해서 next() 사용
})

app.get('/', (req: express.Request, res: express.Response) => {
  // console.log(req.rawHeaders[1]) // 어디서 요청을 보냈는지 확인 가능 (ex. PostmanRuntime/7.30.1)
  // res.send({ data })
  res.send({ cats: Cat })
})

app.get('/cats/blue', (req: express.Request, res: express.Response) => {
  // console.log(req.rawHeaders[1]) // 어디서 요청을 보냈는지 확인 가능 (ex. PostmanRuntime/7.30.1)
  // res.send({ data })
  res.send({ blue: Cat[0] })
})

// 없는 엔드포인트로 접근했을때 에러 처리 미들웨어
app.use((req, res, next) => {
  console.log('this is error middleware');
  res.send({ error: '404 not found error' })
})

app.listen(8000, () => {
  console.log(`Example app listening on port ${port}`)
})



