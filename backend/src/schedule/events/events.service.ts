import { Injectable } from '@nestjs/common';
import { Event } from '../schemas/event.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel('Events') private eventModel: Model<Event>) {}
  getEvents(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  updateEvent(id: string, isLiked: boolean): Promise<Event | null> {
    return this.eventModel
      .findByIdAndUpdate(id, { $set: { isLiked: isLiked } }, { new: true })
      .exec();
  }
}
