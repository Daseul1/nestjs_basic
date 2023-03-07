import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
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

  // api-docs set up
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // 스웨거 API 엔드포인트 지정 => localhost:포트번호/docs

  const PORT = process.env.PORT;
  await app.listen(PORT);
  // await app.listen(8000);
}
bootstrap();
