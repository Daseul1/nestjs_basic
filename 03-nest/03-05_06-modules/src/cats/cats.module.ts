// nestJS cli 를 사용하여 모듈 만드는 방법 : nest g mo cats
//// https://docs.nestjs.com/cli/usages
//// mo: module 의 줄인말 ( mo 대신 module 를 작성해도 됨)
//// cats : 만들고자 하는 모듈명

import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 다른 모듈에서 CatsService를 사용하기 위해서 내보내 주는것
  //                      // export 하지 않는다면, CatsService를 사용 중인 AppMoudule의 provider에
  //                      // 하나하나 다 열거해 줘야함 (ex.  providers: [AppService, CatsService] )
  //                      // privider 에는 해당 module 내에서 만든 service, gatewary 등을 작성하는 것이 단일 패턴을 깨지 않음
})
export class CatsModule {}
