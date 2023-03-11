import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    // 환경변수 설정
    ConfigModule.forRoot(),
    // 몽고 DB 연걸
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CatsModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('cats'); // cats router binding
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 전체 엔드포인트에 대해서 logger 미들웨어 실행
    mongoose.set('debug', this.isDev); // mongoose query log Setting (개발단계에서만 trure / 배포단계에선 false)
  }
}
