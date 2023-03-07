import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatRequetDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

// type 또는 interface 대신에, class를 사용하는 이유
// 1. 데코레이터 패턴을 사용하기 위해 -> 현 파일에서는 validator를 통해 검증 가능
// 2. 재사용성을 위해
