import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

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

  // HTTP basic auth middleware : 스웨거 들어갈때 로그인 해야지 접속 가능하게 설정
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // api-docs set up
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // 스웨거 API 엔드포인트 지정 => localhost:포트번호/docs

  // cors
  app.enableCors({
    origin: true, // 어떤 프론트엔드 사이트에서도 접근 가능하므로, 개발 단계에서만 ture
    //            // 배포단계에서는 origin 에 프론트엔드의 특정 url 작성해 줄것
    credentials: true,
  });

  const PORT = process.env.PORT;
  await app.listen(PORT);
  // await app.listen(8000);
}
bootstrap();
