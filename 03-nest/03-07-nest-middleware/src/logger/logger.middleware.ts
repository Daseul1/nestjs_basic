// logger middleware 만드는 Nest cli 명령어 : nest g middleware logger

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // HTTP 프로토콜에 관한 logger

  use(req: Request, res: Response, next: NextFunction) {
    // // requeset logging
    // // console.log(req.ip); // ::1
    // // console.log(req.originalUrl); // /cats <- GET http://localhost:8000/cats 으로 요청했기에
    // //                            // express 의 middleware 와 동일
    // this.logger.log(`${req.ip}, ${req.method}`, req.originalUrl); // Nest에서 제공해주는 logging 내에 나타남

    // // response logging
    // res.on('finish', () => {
    //   // finish : 이벤트
    //   this.logger.log(res.statusCode);
    // });

    // request + respose logging
    this.logger.log(
      `${req.ip}, ${req.method} ${res.statusCode}`,
      req.originalUrl,
    );

    next();
  }
}
