import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from 'src/cats/cats.module';
import { AuthService } from './auth.service';
import { JwtStragety } from './jwt/jwt.strategy';

@Module({
  imports: [
    // 인증
    PassportModule.register({ dafaultStratregy: 'jwt', session: false }), // sessing cookie 사용 설정 안함

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),

    // CatsModule, // CatModule에서 export 된 것들이 들어오게 됨
    // CatModule 에서는 AuthModule을, AuthModule 에서는 CatModule을 import 하게 되어
    // 순한 모듈 종속성 문제가 발생
    // 모듈간의 순환 종속성을 해결하기 위해서 forwardRef()을 통해 모듈 연결]
    forwardRef(() => CatsModule),
  ],

  providers: [AuthService, JwtStragety],
  exports: [AuthService],
})
export class AuthModule {}
