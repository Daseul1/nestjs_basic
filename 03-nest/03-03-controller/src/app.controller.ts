import { Request } from 'express';
import { Controller, Get, Req, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cats') // 라우터 설정 - http://localhost:8000/cats
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('hello') // GET http://localhost:8000/cats/hello
  // @Get('hello/:id') // 동적 라우팅 설정 : GET http://localhost:8000/cats/hello/123
  //                   // console.log(param); // { id: '123' }
  @Get('hello/:id/:name') // GET http://localhost:8000/cats/hello/123/mina
  //                      // console.log(param); // { id: '123', name: 'mina' }
  getHello(
    @Req() req: Request,
    @Body() body, // req의 body를 인자에서 받아오는 방법
    // @Param() param, // req의 parma 를 인자에서 받아오는 방법
    @Param() param: { id: string; name: string }, // parma의 DTO 설정
  ): string {
    console.log(req);
    const body2 = req.body; // req 내 body 받아오기
    console.log(param); // @Get('hello/:id') -> { id: '123' }
    //                  // @Get('hello/:id/:name') -> { id: '123', name: 'mina' }
    return this.appService.getHello();
  }
}
