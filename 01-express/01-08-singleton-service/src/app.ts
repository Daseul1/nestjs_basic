import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app; // 인스턴스가 1개 찍힐때마다 app이 하나씩 생성되게 됨
  }

  private setRoute() {
    // 라우터 등록
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    // logging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log("this is logging middleware");
      next(); // 미들웨어를 만난 후, 다음 라우터가 실행되기 위해서 next() 사용
    });

    // json middleware
    this.app.use(express.json());

    this.setRoute();

    // 404 middleware
    this.app.use((req, res, next) => {
      console.log("this is error middleware");
      res.send({ error: "404 not found error" });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log(`Example app listening on ...`);
    });
  }
}

function init() {
  const server = new Server(); // 서버 인스턴스 생성
  server.listen();
}

init();
