import { CatsService } from './cats/cats.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, //
    private readonly catsService: CatsService, // CatsModule에서 export 해줘야지 사용 가능
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
