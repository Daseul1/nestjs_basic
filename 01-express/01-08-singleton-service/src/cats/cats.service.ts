import { Request, Response } from "express";
import { Cat } from "./cats.model";

// api 별로 라우터 등록 시키기 -> router.
// READ 고양이 전체 데이터 조회 => GET
export const readAllcat = (req: Request, res: Response) => {
  try {
    const cats = Cat;
    // throw new Error('db connect error') // 에러 던져보기
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// READ 특정 고양이 데이터 조회 => GET
export const readCat = (req: Request, res: Response) => {
  // :id -> 자체가 파라미터가 되어 id를 함수 내에서 변수처럼 사용 가능
  try {
    const params = req.params;
    console.log(params); // { id: 'fsduifh' } -> 출력을 원하는 고양이 id를 넣어준 값이 req.params 내로 들어옴
    const cat = Cat.find((cat: any) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// CREATE 새로운 고양이 추가 api => POST
export const createCat = (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    Cat.push(data); // 데이터 저장
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// UPDATE 고양이 데이터 업데이트 => PUT
export const updateCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;

    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = body;
        result = cat; // 바뀐 데이터로 순회를 돌수있게 result에 재할당
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result, // 바뀐 데이터로 응답을 보냄
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// UPDATE 고양이 데이터 부분적으로 업데이트 => PATCH
export const updateParticalCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;

    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = { ...cat, ...body }; // 구조분해할당을 통해 부분적 업데이트
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// DELETE 고양이 데이터 삭제 => DELETE
export const deleteCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const newCat = Cat.filter((cat) => cat.id !== params.id);

    res.status(200).send({
      success: true,
      data: newCat,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};
