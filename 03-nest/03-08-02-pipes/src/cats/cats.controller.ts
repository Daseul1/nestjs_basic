import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // 3. HttpExceptionFilter를 class 단위로 적용시키기
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  // @UseFilters(HttpExceptionFilter) // 3. HttpExceptionFilter를 각각의 API에 적용시키기
  getAllCat() {
    // throw new HttpException('api is broken', 401); // 1. { "statusCode": 401, "message": "api is broken" }

    // 2. error 커스텀
    // throw new HttpException(
    //   {
    //     success: false, //
    //     message: 'api is broken',
    //   },
    //   401,
    // ); // { "success": false, "message": "api is broken" }

    // 3. HttpExceptionFilter 적용시키기
    // throw new HttpException('api is broken', 401); // { "statusCode": 401, "timestamp": "2023-02-23T10:42:44.149Z", "path": "/cats" }

    // 4. HttpException 응답 커스텀 버전
    throw new HttpException('api is broken', 401); // { "sucess": false, "timestamp": "2023-02-23T10:46:27.587Z", "path": "/cats", "error": "api is broken" }

    return 'all cat';
  }

  // cats/:id
  @Get(':id')
  // getOneCat(@Param() param) { // 1.  :id 인 동적라우팅 파라미터 받기
  // getOneCat(@Param('id') param) { // 2. id 라는 키 값을 명확히 알려줘서 파라미터로 value 값만 받기
  // 3. id value 값을 number 타입으로 받기 => pipes 사용
  // 만약 id를 숫자가 아닌 값(abc)으로 넣는다면 validation 400 에러 나타나서 유효성 검사에도 좋음
  getOneCat(@Param('id', ParseIntPipe) param: number) {
    console.log(param); // 1. { id: '123' } // 2. 123 => value 값만 받아짐(string 타입임!) // 3. 123
    console.log(typeof param); // 2. string // 3. number
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatdPartialCat() {
    return 'update';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete';
  }
}
