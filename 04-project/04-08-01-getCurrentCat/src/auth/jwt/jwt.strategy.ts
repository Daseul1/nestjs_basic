import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStragety extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'accessKey',
      ignoreExpiration: false, // Jwt 토큰이 만료되었는지 확인 : 기본 false 설정
    });
  }
  async validate(payload: Payload) {
    // id를 통해서 cat 찾기
    const cat = await this.catsRepository.findCatIdWithoutPassword(payload.sub);

    if (cat) {
      return cat; // request.user 로 cat 정보가 들어감
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
