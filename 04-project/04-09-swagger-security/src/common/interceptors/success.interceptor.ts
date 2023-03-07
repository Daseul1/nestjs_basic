import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// interceptor : controller 가 응답을 보냈을 때, 데이터를 받아서 가공하는 곳(filter 처럼 사용)
// 따라서, controller 실행 전 단계는 middleware에서 관리해 주며
// controller 실행 후 단계를 interceptor 에서 관리

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...'); // controller 실행 전 실행됨 => 보통 middleware 단계에서 사용하는 것이 일반적

    // const now = Date.now();
    // return next // controller 실행 후 실행됨
    //   .handle()
    //   .pipe(tap(() => console.log(`After9... ${Date.now() - now}ms`))); // { "cats": "all cat" }

    // exceptionFilter(실패시 sucess: false) 처럼 success: ture 일 때 분기 처리
    // 데이터 형식을 유지하면서 프론트에 결과 값 반환 가능 => 성공한 응답인 것인지, 실패한 응답인 것인지
    return next.handle().pipe(
      map((data) => ({
        // Nest  에서 사용하는 rxjs 라이브러리 map 형태가 정해져 있음
        // data : controller 실행 후, return 받은 값이 들어옴
        success: true,
        data: data,
      })),
    ); // { "success": true, "data": { "cats": "all cat" } }
  }
}
