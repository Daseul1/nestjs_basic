import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
    // fs.mkdirSync : 폴더를 만드는 명령어
    // path.join(__dirname : 현재 폴더 의미
    // '..' : 부모 폴더 의미
    // 즉, 현재 폴더의 부모 폴더로 이동하여 부모 폴더에 uploads 라는 폴더를 만들어라는 의미
  } catch (error) {
    console.log('The folder already exists...'); // 이미 존재하는 폴더라면 에러 처리
  }
  try {
    console.log(`💾 Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
    // upload 폴더 내에 cats 폴더 생성할 것
  } catch (error) {
    console.log(`The ${folder} folder already exists...`); // 이미 존재하는 폴더라면 에러 처리
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder); // 폴더 생성
  return multer.diskStorage({
    destination(req, file, cb) {
      //* 어디에 저장할 지
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      cb(null, folderName); // cb(_, dest) => 어디에 저장할 지 저장 위치 지정
    },
    filename(req, file, cb) {
      //* 어떤 이름으로 파일을 올릴 지
      const ext = path.extname(file.originalname);
      // extname : 파일을 올렸을 때 파일의 확장자 추출

      const fileName = `${path.basename(
        // 저장할 파일 이름 설정
        file.originalname,
        ext,
      )}${Date.now()}${ext}`; // 같은 파일 이름이 있으면 오류가 생기기에, 파일 업로드 시간을 더해서 새로운 파일 생성

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  // upload 내에 해당 API 폴더 생성
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
