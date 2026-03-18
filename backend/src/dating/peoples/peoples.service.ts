import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { People } from '../schemas/people.schema';
import { CreatePeopleDto } from '../dto/people.dto';

@Injectable()
export class PeoplesService {
  constructor(@InjectModel('Peoples') private userModel: Model<People>) {}
  getPeoples(): Promise<People[]> {
    return this.userModel.find().exec();
  }

  updatePeople(id: string, isLiked: boolean): Promise<People | null> {
    return this.userModel
      .findByIdAndUpdate(id, { $set: { isLiked: isLiked } }, { new: true })
      .exec();
  }

  createPeople(people: CreatePeopleDto): Promise<People> {
    return this.userModel.create(people);
  }
}
