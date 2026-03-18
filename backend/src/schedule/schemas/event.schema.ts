import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  start_time: string;

  @Prop({ required: true })
  end_time: string;

  @Prop({ required: true })
  speaker_name: string;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company_name: string;

  @Prop({ default: false })
  isLiked: boolean;

  @Prop({ default: '' })
  photo_url: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
