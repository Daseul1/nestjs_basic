import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // HttpExceptionFilter를 class 단위로 적용시키기
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  // @UseFilters(HttpExceptionFilter) // HttpExceptionFilter를 각각의 API에 적용시키기
  getAllCat() {
    // throw new HttpException('api is broken', 401); // { "statusCode": 401, "message": "api is broken" }

    // error 커스텀
    // throw new HttpException(
    //   {
    //     success: false, //
    //     message: 'api is broken',
    //   },
    //   401,
    // ); // { "success": false, "message": "api is broken" }

    // HttpExceptionFilter 적용시키기
    // throw new HttpException('api is broken', 401); // { "statusCode": 401, "timestamp": "2023-02-23T10:42:44.149Z", "path": "/cats" }

    // HttpException 응답 커스텀 버전
    throw new HttpException('api is broken', 401); // { "sucess": false, "timestamp": "2023-02-23T10:46:27.587Z", "path": "/cats", "error": "api is broken" }

    return 'all cat';
  }

  // cats/:id
  @Get(':id')
  getOneCat() {
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
