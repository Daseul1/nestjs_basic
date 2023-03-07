import { Router } from "express";
import { Cat } from "./cats.model";
import {
  createCat,
  deleteCat,
  readAllcat,
  readCat,
  updateCat,
  updateParticalCat,
} from "./cats.service";

const router = Router(); // 라우터 인스턴스를 만들기

router.get("/cats", readAllcat);
router.get("/cats/:id", readCat);
router.post("/cats", createCat);
router.put("/cats/:id", updateCat);
router.patch("/cats/:id", updateParticalCat);
router.delete("/cats/:id", deleteCat);

// 등록된 라우터들 app.ts 파일로 보내주기
export default router;
