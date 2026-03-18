import {
  IsString,
  IsNumber,
  IsArray,
  IsInt,
  IsEnum,
  IsUrl,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export const ActivityTypes = [
  'Предпринимаю',
  'Путешествую',
  'Работаю',
  'Учусь',
  'Другое',
  'IT',
] as const;

export type ActivityType = (typeof ActivityTypes)[number];

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
  @IsEnum(ActivityTypes)
  type_activity: (typeof ActivityTypes)[number];
  @IsString()
  @IsUrl()
  photo_url: string;
  @IsBoolean()
  isLiked?: boolean;
}

export class CreatePeopleDto {
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

  @IsEnum(ActivityTypes)
  type_activity: ActivityType;

  @IsString()
  @IsUrl()
  photo_url: string;

  @IsBoolean()
  @IsOptional()
  isLiked?: boolean;
}
