import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

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
      'https://github.com/Daseul1/nestjs_basic/blob/master/images/cherry.png?raw=true',
  })
  @IsString()
  imgUrl: string;

  // virtural 추가
  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

export const _CatSchema = SchemaFactory.createForClass(Cat); // Cat 클래스를 스키마로 만듦

// Mongoose 에서 virtural 은 MongoDB에 저장되지 않는 속성
// https://mongoosejs.com/docs/tutorials/virtuals.html#your-first-virtual
// ∴ virtural field : 실제로 DB에 저장되는 Field는 아님, 서비스 로직에서는 사용 가능
// readOnlyData : 클라이언트에게 보여줄 데이터
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

// comments virtual field
_CatSchema.virtual('comments', {
  ref: 'comments', // ref : 해당 schema 이름
  localField: '_id',
  foreignField: 'info', // foreignField : 외래 field (cat 입장에서 외래 필드인 comments info 필드  )
});
// 현재 스키마의 localField 의 값과 일치하는 ref 스키마의 foreignField 의 값이 든 데이터를 가지고 오는 것

// Populate : 다른 문서와 이어주는 메서드 사용 => Populate 설정
_CatSchema.set('toObject', { virtuals: true }); // 객체로 변환 가능
_CatSchema.set('toJSON', { virtuals: true }); // JSON 형태로 변환 가능

export const CatSchema = _CatSchema;
