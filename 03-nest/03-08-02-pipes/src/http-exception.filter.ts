import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // ExceptionFilter를 전역 설정 방법과 각각의 API/클래스 에 설정하는 방법 2가지 존재
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 컨텍스트 : 실행환경에 대해서
    const response = ctx.getResponse<Response>(); // res 가져오기
    const request = ctx.getRequest<Request>(); // req 가져오기
    const status = exception.getStatus(); // status 가져오기
    // const error = exception.getResponse(); // getResponse()를 사용하면 cats.controller.ts 파일의  HttpException 함수 인자가 전달되어 들어옴
    // error 타입 : string | object -> string : 우리가 처리해준 에러
    //                             -> Nest에서 던지는 에러 (Json 형식)

    // 2. error 타입을 위한 커스텀
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    // 3. error 타입을 위한 분기처리 : string 과 string[]
    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error, // 비구조할당
      });
    }
    /**
     * {
    "success": false,
    "timestamp": "2023-02-23T11:31:04.026Z",
    "statusCode": 404,
    "message": "Cannot GET /asdfasfd",
    "error": "Not Found"
}
     */

    // res.status(400).send({'에러 발생 했어요!!'}) // express error 발생 형식
    // 1. nest 도 express 와 동일한 형식인 것
    // response.status(status).json({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // });

    // 2. HttpException 응답 커스텀 버전
    response.status(status).json({
      sucess: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: error,
    });
  }
}
