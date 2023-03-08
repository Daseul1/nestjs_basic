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

  // 비밀번호를 제외한 cat 찾기(보안상의 이유)
  async findCatIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    // select : Cat 모델 중 원하는 Field 만 골라서 올 수있음
    // select('-password'): password 제외하고 가져오기
    // select('email name'): email 과 name 가져오기 => 띄어쓰기로 구분
    return cat;
  }

  // upload image update
  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://loaclhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    console.log(newCat);

    return newCat.readOnlyData;
  }

  async findAll() {
    return await this.catModel.find();
  }
}
