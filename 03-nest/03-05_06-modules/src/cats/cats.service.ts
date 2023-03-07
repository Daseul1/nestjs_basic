// nestJS cli 를 사용하여 service 만드는 방법 : nest g s(service) cats

import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {}
