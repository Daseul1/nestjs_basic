import { Router } from "express";
import { Cat } from "./cats.model";

const router = Router(); // 라우터 인스턴스를 만들기

// api 별로 라우터 등록 시키기 -> router.
// READ 고양이 전체 데이터 조회
router.get("/cats", (req, res) => {
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
});

// READ 특정 고양이 데이터 조회
router.get("/cats/:id", (req, res) => {
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
});

// CREATE 새로운 고양이 추가 api
router.post("/cats", (req, res) => {
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
});

// 등록된 라우터들 app.ts 파일로 보내주기
export default router;
