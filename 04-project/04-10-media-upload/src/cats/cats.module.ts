import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';

@Module({
  imports: [
    // 파일 업로드를 위한 express 용 multer middleware 사용
    // Multer은 주로 HTTP POST 요청을 통해 파일을 업로드하는데 사용 됨
    // multipart/form-data 형식으로 데이터 처리 => Content-Type 을 multipart/form-data로 사용하면 되는것
    MulterModule.register({
      dest: './upload', // dest : 업로드된 파일 저장 위치 설정
    }),

    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),

    // AuthModule,
    // CatModule 에서는 AuthModule을, AuthModule 에서는 CatModule을 import 하게 되어
    // 순한 모듈 종속성 문제가 발생 => 모듈간의 순환 종속성을 해결하기 위해 forwardRef() 사용
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
