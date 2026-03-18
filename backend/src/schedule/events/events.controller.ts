import { Controller, Get, Param, Body, Patch } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from '../schemas/event.schema';
import { EventDto } from '../dto/event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(): Promise<EventDto[]> {
    return this.eventsService.getEvents();
  }

  @Patch(':id')
  updateEvents(
    @Param('id') id: string,
    @Body('isLiked') isLiked: boolean,
  ): Promise<EventDto | null> {
    return this.eventsService.updateEvent(id, isLiked);
  }
}
