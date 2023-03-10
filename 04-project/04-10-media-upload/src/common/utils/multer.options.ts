import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('πΎ Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
    // fs.mkdirSync : ν΄λλ₯Ό λ§λλ λͺλ Ήμ΄
    // path.join(__dirname : νμ¬ ν΄λ μλ―Έ
    // '..' : λΆλͺ¨ ν΄λ μλ―Έ
    // μ¦, νμ¬ ν΄λμ λΆλͺ¨ ν΄λλ‘ μ΄λνμ¬ λΆλͺ¨ ν΄λμ uploads λΌλ ν΄λλ₯Ό λ§λ€μ΄λΌλ μλ―Έ
  } catch (error) {
    console.log('The folder already exists...'); // μ΄λ―Έ μ‘΄μ¬νλ ν΄λλΌλ©΄ μλ¬ μ²λ¦¬
  }
  try {
    console.log(`πΎ Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
    // upload ν΄λ λ΄μ cats ν΄λ μμ±ν  κ²
  } catch (error) {
    console.log(`The ${folder} folder already exists...`); // μ΄λ―Έ μ‘΄μ¬νλ ν΄λλΌλ©΄ μλ¬ μ²λ¦¬
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder); // ν΄λ μμ±
  return multer.diskStorage({
    destination(req, file, cb) {
      //* μ΄λμ μ μ₯ν  μ§
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      cb(null, folderName); // cb(_, dest) => μ΄λμ μ μ₯ν  μ§ μ μ₯ μμΉ μ§μ 
    },
    filename(req, file, cb) {
      //* μ΄λ€ μ΄λ¦μΌλ‘ νμΌμ μ¬λ¦΄ μ§
      const ext = path.extname(file.originalname);
      // extname : νμΌμ μ¬λ Έμ λ νμΌμ νμ₯μ μΆμΆ

      const fileName = `${path.basename(
        // μ μ₯ν  νμΌ μ΄λ¦ μ€μ 
        file.originalname,
        ext,
      )}${Date.now()}${ext}`; // κ°μ νμΌ μ΄λ¦μ΄ μμΌλ©΄ μ€λ₯κ° μκΈ°κΈ°μ, νμΌ μλ‘λ μκ°μ λν΄μ μλ‘μ΄ νμΌ μμ±

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  // upload λ΄μ ν΄λΉ API ν΄λ μμ±
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
