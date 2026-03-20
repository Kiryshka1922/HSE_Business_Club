import { Body, Controller, Get, Patch, Param } from '@nestjs/common';
import { PeoplesService } from './peoples.service';
import { PeopleDto } from '../dto/people.dto';

@Controller('peoples')
export class PeoplesController {
  constructor(private readonly peopleService: PeoplesService) {}

  @Get()
  getPeoples(): Promise<PeopleDto[]> {
    return this.peopleService.getPeoples();
  }

  @Patch(':id')
  updatePeople(
    @Param('id') id: string,
    @Body('isLiked') isLiked: boolean,
  ): Promise<PeopleDto | null> {
    return this.peopleService.updatePeople(id, isLiked);
  }
}
