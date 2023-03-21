import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DefaultExceptions } from './exceptions/default.exception';
import { queryLogger } from './utils/logger';
import helmet from 'helmet';
import { helmetOpt } from './utils/options/helmet';
import { corsOpt } from './utils/options/cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {abortOnError: false})
  
  const PORT = process.env.PORT || 3000;

  app.enableCors(corsOpt)
  app.use(helmet(helmetOpt))
  app.use(cookieParser(process.env.SECRET_KEY_SESSION))
  app.useGlobalFilters(new DefaultExceptions())

  app.useStaticAssets(join(__dirname, '..', 'public'))

  if (process.env.NODE_ENV === 'production') {
    app.use('*', (req, res, next) => {
      queryLogger.log(
        'info',
        `${req.protocol} ${req.method} ${req.originalUrl} ${req.sessionID} ${req.ip}`,
      );
      next();
    });
  }

  const config = new DocumentBuilder()
    .setTitle('Server socket chat API')
    .setDescription('Документація REST API')
    .setVersion('1.0.0')
    .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}
bootstrap();
