import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from '../cats.schema';
import { CatRequetDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';

@Injectable()
export class CatsService {
  constructor(
    // service -> DB
    // @InjectModel(Cat.name) private readonly catModel: Model<Cat>

    // service -> repository -> DB
    private readonly catsRepository: CatsRepository,
  ) {}

  async signUp(body: CatRequetDto) {
    const { email, name, password } = body;

    // 이메일 중복 체크 : Query 메서드 exists 사용
    const isCatExist = await this.catsRepository.existsByEmail(email); // Promise<Boolea> 값 리턴
    if (isCatExist) {
      // throw new HttpException('해당하는 고용이는 이미 존재합니다', 403)
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.'); // 403 error를 던져주는 에러
    }
    // password 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB 저장
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    // virtural 을 반환하도록 추가
    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`; // 1개의 파일 업로드만 생각해서 [0]번째로

    console.log(fileName);

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);

    return newCat;
  }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }
}
