import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class DecryptMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const buff = Buffer.from(JSON.stringify(req.body), 'base64')
    // const utf8data = buff.toString('utf8')
    // req.body = utf8data
    // console.log('middleware',req.body)
    // console.log('middleware',req.body)
    next();
  }
}
