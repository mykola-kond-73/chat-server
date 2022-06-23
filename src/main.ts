import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { sessionOpt } from './options/session'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DefaultExceptions } from './exceptions/default.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const PORT = process.env.PORT || 3000

  app.use(session(sessionOpt))
  app.enableCors()
  app.useGlobalFilters(new DefaultExceptions())

  const config = new DocumentBuilder()
    .setTitle('Server socket chat API')
    .setDescription('Документація REST API')
    .setVersion('1.0.0')
    .addTag('tag')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  

  await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}
bootstrap()