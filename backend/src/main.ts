import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { People } from './dating/schemas/people.schema';
import { Event } from './schedule/schemas/event.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { peoples, events } from './mocks';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'api/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
