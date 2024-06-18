import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { TimeSlotService } from './timeslot.service';
import { CreateTimeSlotDto } from './dto/create-timeslot.dto';
import { UpdateTimeSlotDto } from './dto/update-timeslot.dto';
import { TimeSlot } from './schemas/timeslot.schema';

@Controller('timeslots')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Post()
  async create(@Body() createTimeSlotDto: CreateTimeSlotDto): Promise<TimeSlot> {
    return this.timeSlotService.create(createTimeSlotDto);
  }

  @Get()
  async findAll(): Promise<TimeSlot[]> {
    return this.timeSlotService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TimeSlot> {
    return this.timeSlotService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTimeSlotDto: UpdateTimeSlotDto): Promise<TimeSlot> {
    return this.timeSlotService.update(id, updateTimeSlotDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<TimeSlot> {
    return this.timeSlotService.delete(id);
  }
}
