import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

// 스키마에 대한 옵션
const options: SchemaOptions = {
  timestamps: true,
  // collection: 'comments',
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, // 몽구스에서 생성되는 id 타입
    //                       => 사용자가 쓸때는 몽고DB에서 자동으로 string 형채로 변환해주나 타입 핸들링할 때는 원래의 기본 타입을 입력
    required: true,
    ref: 'cats', // 어떤 document와 연결할 것인지 설정
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 내용',
    required: true,
  })
  @Prop()
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
    required: true,
  })
  @Prop({ default: 0 })
  @IsPositive() // 정수
  likeCount: number;

  @ApiProperty({
    description: '작성 대상 (게시물, 정보글)',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: Types.ObjectId; // 어느 고양이한테 댓글을 남겼는지에 대한 정보
}

export const CommentsSchema = SchemaFactory.createForClass(Comments); // Cat 클래스를 스키마로 만듦
