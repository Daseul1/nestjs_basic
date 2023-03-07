import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequetDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cats.dto';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Cat } from './cats.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' }) // api docs 에서 api 설명 추가
  @UseGuards(JwtAuthGuard) // 로그인한 유저만 해당 API 사용가능하게 설정 -> UseGuard
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    // decorator custom 추가
    return cat.readOnlyData; // virtural field 로 반환(원하는 값만 반환 가능하기에)
  }

  // api-docs 설명서 : respose 부분
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ReadOnlyCatDto, // 성공했을 때 받을 수 있는 객체 표기
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequetDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  // @UseInterceptors(FileInterceptor('image')) // 파일 1개 업로드
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions('cats'))) // 파일 여러개 업로드
  @Post('upload')
  uploadCatImg(
    // @UploadedFile() file: Express.Multer.File // 파일 1개 업로드
    @UploadedFiles() files: Array<Express.Multer.File>, // 파일 여러개 업로드
  ) {
    console.log(files);
    return 'uploadImg';
  }
}
