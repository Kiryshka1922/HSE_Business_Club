import { Module } from '@nestjs/common';
import { PeoplesService } from './peoples/peoples.service';
import { PeoplesController } from './peoples/peoples.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleSchema } from './schemas/people.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Peoples', schema: PeopleSchema }]),
  ],
  controllers: [PeoplesController],
  providers: [PeoplesService],
})
export class DatingModule {}
