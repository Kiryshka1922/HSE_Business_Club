import {
  IsString,
  IsBoolean,
  IsUrl,
  IsOptional,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class EventDto {
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'start_time должна быть в формате ЧЧ:ММ (например 10:00)',
  })
  start_time: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'end_time должна быть в формате ЧЧ:ММ (например 18:30)',
  })
  end_time: string;

  @IsString()
  speaker_name: string;

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  place: string;

  @IsBoolean()
  @IsOptional()
  isLiked?: boolean;

  @IsUrl()
  @IsOptional()
  photo_url?: string;
}
