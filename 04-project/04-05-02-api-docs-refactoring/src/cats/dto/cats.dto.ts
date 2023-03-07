import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// api-docs refactoring -> extends
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '486512',
    description: 'id',
  })
  id: string;
}

// PickType(Cat, ['name', 'price']); => 필요한 것만 가지고 오기
// OmitType(Cat, ['description']);   => 필요없는 것은 빼고 모두 가지고 오기
// PartialType(Cat);                 => 있어도 되고 없어도 됨(nullable)

// export class ReadOnlyCatDto {
//   @ApiProperty({
//     example: '486512',
//     description: 'id',
//   })
//   id: string;

//   @ApiProperty({
//     example: 'abc@naver.com',
//     description: 'email',
//     required: true,
//   })
//   email: string;

//   @ApiProperty({
//     example: 'mina',
//     description: 'namez',
//     required: true,
//   })
//   name: string;
// }
