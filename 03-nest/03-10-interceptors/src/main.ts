import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // 전역에서 HttpExceptionFilter를 적용시키는것
  //                                               // Nest 자체에서 던지는 에러 필터링까지 가능!
  /**  
   * {
    "sucess": false,
    "timestamp": "2023-02-23T10:50:10.526Z",
    "path": "/asdfasfd",
    "error": {
        "statusCode": 404,
        "message": "Cannot GET /asdfasfd",
        "error": "Not Found"
    }
  }
   */
  await app.listen(8000);
}
bootstrap();
