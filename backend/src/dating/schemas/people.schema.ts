import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
    required: true,
  })
  type_activity: string;

  @Prop({ default: '' })
  photo_url: string;

  @Prop({ default: false })
  isLiked: boolean;
}

export const PeopleSchema = SchemaFactory.createForClass(People);
