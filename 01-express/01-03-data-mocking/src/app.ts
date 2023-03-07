import * as express from "express";
import { Cat } from './app.model'

const app: express.Express = express();
const port: number = 8000;

// 데이터 모킹 : 실제 데이터가 아니라 개발자가 필요에 의해 만든 데이터
const data = [1 ,2, 3, 4]


app.get('/', (req: express.Request, res: express.Response) => {
  console.log(req)
  // res.send({ data })
  res.send({ cats: Cat })
})

app.listen(8000, () => {
  console.log(`Example app listening on port ${port}`)
})