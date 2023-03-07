
import * as express from "express";
import { Cat } from './app.model'

const app: express.Express = express();
const port: number = 8000;



// logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1])
  console.log('this is logging middleware');
  next() // 미들웨어를 만난 후, 다음 라우터가 실행되기 위해서 next() 사용
})


// json middleware
app.use(express.json())


// READ 고양이 전체 데이터 조회
app.get('/cats', (req, res) => {
  try{
    const cats = Cat
    // throw new Error('db connect error') // 에러 던져보기
    res.status(200).send({
      success: true,
      data: {
        cats
      }
    })
  } catch (error : any) {
    console.log(error)
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
})


// READ 특정 고양이 데이터 조회
app.get('/cats/:id', (req, res) => { // :id -> 자체가 파라미터가 되어 id를 함수 내에서 변수처럼 사용 가능
  try{
    const params = req.params
    console.log(params) // { id: 'fsduifh' } -> 출력을 원하는 고양이 id를 넣어준 값이 req.params 내로 들어옴
    const cat = Cat.find((cat) => {
      return cat.id === params.id
    })
    res.status(200).send({
      success: true,
      data: {
        cat
      }
    })
  } catch (error : any) {
    console.log(error)
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
})


// CREATE 새로운 고양이 추가 api
app.post('/cats', (req, res) => {
  try{
    const data = req.body
    console.log(data)
    Cat.push(data) // 데이터 저장
    res.status(200).send({
      success: true,
      data: { data }
    })
  } catch (error : any) {
    console.log(error)
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
})


// 404 middleware
app.use((req, res, next) => {
  console.log('this is error middleware');
  res.send({ error: '404 not found error' })
})


app.listen(8000, () => {
  console.log(`Example app listening on port ${port}`)
})


