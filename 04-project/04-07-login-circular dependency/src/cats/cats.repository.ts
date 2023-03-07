import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequetDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  // 이메일 확인
  async findCatByEmail(email: string): Promise<Cat | null> {
    const user = await this.catModel.findOne({ email });
    return user;
  }

  // 이메일 존재 여부 확인
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email }); // exists 의 return 값이 _id
    // return 값 bollean 처리
    if (result) return true;
    else return false;
  }

  // cat create
  async create(cat: CatRequetDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
