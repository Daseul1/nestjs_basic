import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();
const port: number = 8000;

// logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next(); // 미들웨어를 만난 후, 다음 라우터가 실행되기 위해서 next() 사용
});

// json middleware
app.use(express.json());

// 라우터 등록
app.use(catsRouter);

// 404 middleware
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

app.listen(8000, () => {
  console.log(`Example app listening on port ${port}`);
});
