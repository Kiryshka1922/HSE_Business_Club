import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { People } from './dating/schemas/people.schema';
import { Event } from './schedule/schemas/event.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { peoples, events } from './mocks';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:8080'], // массив разрешённых origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // если используете cookies/авторизацию
  });

  const peopleModel = app.get<Model<People>>(getModelToken('Peoples'));
  const eventModel = app.get<Model<Event>>(getModelToken('Events'));

  await peopleModel.deleteMany({});
  await eventModel.deleteMany({});
  console.log('🗑️ Старые данные удалены');

  await peopleModel.insertMany(peoples);
  console.log(`✅ Создано ${peoples.length} людей`);

  await eventModel.insertMany(events);
  console.log(`✅ Создано ${events.length} событий`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Busines_Club API')
    .setDescription('Mini-app for busines_club')
    .setVersion('1.0')
    .addTag('app')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Сохраняем как YAML
  const yamlString = yaml.dump(document);
  fs.writeFileSync('./openapi.yaml', yamlString);

  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'api/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
