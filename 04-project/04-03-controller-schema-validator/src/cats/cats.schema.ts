import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

// 스키마에 대한 옵션
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options) // 스키마 정의
export class Cat extends Document {
  // mongoose의 Document를 상속받아 Cat 클래스 설계
  @Prop({
    required: true, // 반드시 필요 (required default = false -> ∴ 넣지않으면 false 인것)
    unique: true, // 유일한 값
  })
  @IsEmail() // validator : 이메일 형식 이여야됨
  @IsNotEmpty() // validator : 빈 값이 아니여야됨
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat); // Cat 클래스를 스키마로 만듦
