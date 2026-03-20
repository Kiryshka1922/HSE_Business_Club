import {
  IsString,
  IsNumber,
  IsArray,
  IsInt,
  IsUrl,
  IsBoolean,
} from 'class-validator';
import { Types } from 'mongoose';

export class PeopleDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsNumber()
  @IsInt()
  age: number;
  @IsArray()
  @IsString({ each: true })
  interests: string[];
  @IsString()
  description: string;
  @IsString()
  tg_username: string;
  @IsString()
  type_activity: string;
  @IsString()
  @IsUrl()
  photo_url: string;
  @IsBoolean()
  isLiked?: boolean;
  @IsString()
  _id?: Types.ObjectId;
}
