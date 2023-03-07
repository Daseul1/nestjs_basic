// id 값을 무조건 양수인 값으로 걸러주기
import { Injectable, PipeTransform } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    // parseInt 의 결과값이 value 로 들어오는 것
    //                        // parseInt 를 통해 Int 타입으로 변환된 값이 들어와야하는데
    //                        // 🚨 현재 버전 차이로 인해 float -> Int 로 변환되지 않음

    console.log(value);

    if (value < 0) {
      throw new HttpException('value > 0', 400);
    }
    return value; // transform 함수의 결과값이 pipe의 결과값이 되는것
  }
}
