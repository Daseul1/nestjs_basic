import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // User 확인
    // 1. 이메일 확인
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException(
        '존재하지 않는 계정입니다. 이메일을 확인해 주세요.',
      );
    }

    // 2. password 확인
    const isPasswordValited: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValited) {
      throw new UnauthorizedException(
        '비밀번호가 틀렸습니다. 비밀번호를 확인해 주세요.',
      );
    }

    // 3. AccessToken 발급
    const payload = { email: email, sub: cat.id }; // sub : 토큰 제목 의미 ( cat의 고유 식별자를 넣음)

    return {
      token: this.jwtService.sign(payload, { secret: 'accessKey' }), // 유저 정보를 담은 payload를 넣어 sign 메서드를 통해 토큰 생성
    };
  }
}
