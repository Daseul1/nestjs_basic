import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

// 스키마에 대한 옵션
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options) // 스키마 정의
export class Cat extends Document {
  // mongoose의 Document를 상속받아 Cat 클래스 설계

  // api-docs refactoring -> extends
  @ApiProperty({
    example: 'abc@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true, // 반드시 필요 (required default = false -> ∴ 넣지않으면 false 인것)
    unique: true, // 유일한 값
  })
  @IsEmail() // validator : 이메일 형식 이여야됨
  @IsNotEmpty() // validator : 빈 값이 아니여야됨
  email: string;

  @ApiProperty({
    example: 'mina',
    description: 'namez',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    // default img 설정
    default:
      'https://github.com/amamov/teaching-nestjs-a-to-z/blob/main/images/1.jpeg?raw=true',
  })
  @IsString()
  imgUrl: string;

  // virtural 추가
  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat); // Cat 클래스를 스키마로 만듦

// Mongoose 에서 virtural 은 MongoDB에 저장되지 않는 속성
// https://mongoosejs.com/docs/tutorials/virtuals.html#your-first-virtual
// ∴ virtural field : 실제로 DB에 저장되는 Field는 아님, 서비스 로직에서는 사용 가능
// readOnlyData : 클라이언트에게 보여줄 데이터
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
