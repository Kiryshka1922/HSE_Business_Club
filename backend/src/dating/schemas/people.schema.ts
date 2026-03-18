import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { type ActivityType } from '../dto/people.dto';

@Schema()
export class People extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ type: [String], default: [] })
  interests: string[];

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  tg_username: string;

  @Prop({
    type: String,
    required: true,
  })
  type_activity: ActivityType;

  @Prop({ default: '' })
  photo_url: string;

  @Prop({ default: false })
  isLiked: boolean;
}

export const PeopleSchema = SchemaFactory.createForClass(People);
