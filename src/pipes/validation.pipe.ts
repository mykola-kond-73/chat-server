//* pipe або форматує вхідні дані або валідує їх

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value); //? отримуємо об'єкт який будемо валідувати
    const errors = await validate(obj); //? отримуємо масив помилкок які будуть після валідації obj
    
    if (errors.length) {
      const message = errors.map((err) => {
        return `${err.property} - [${Object.values(err.constraints).join(', ',)}]`
      })

      throw new ValidationException(message);
    }
    return value;
  }
}
