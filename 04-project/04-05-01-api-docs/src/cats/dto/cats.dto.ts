import { ApiProperty } from '@nestjs/swagger';

export class ReadOnlyCatDto {
  @ApiProperty({
    example: '486512',
    description: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'abc@naver.com',
    description: 'email',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'mina',
    description: 'namez',
    required: true,
  })
  name: string;
}
