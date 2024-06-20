import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeSlotService } from './timeslot.service';
import { CreateTimeSlotDto } from './dto/create-timeslot.dto';
import { UpdateTimeSlotDto } from './dto/update-timeslot.dto';
import { TimeSlot } from './schemas/timeslot.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('timeslots')
@Controller('timeslots')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @ApiOperation({ summary: 'Create a new time slot' })
  @ApiResponse({ status: 201, description: 'Time slot created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiBody({ type: CreateTimeSlotDto })
  @Post()
  async create(
    @Body() createTimeSlotDto: CreateTimeSlotDto,
  ): Promise<TimeSlot> {
    return this.timeSlotService.create(createTimeSlotDto);
  }

  @ApiOperation({ summary: 'Get all time slots' })
  @ApiResponse({
    status: 200,
    description: 'Time slots retrieved successfully',
  })
  @Get()
  async findAll(): Promise<TimeSlot[]> {
    return this.timeSlotService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific time slot by ID' })
  @ApiResponse({ status: 200, description: 'Time slot retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Time slot not found' })
  @ApiParam({ name: 'id', description: 'The ID of the time slot' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TimeSlot> {
    return this.timeSlotService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a time slot by ID' })
  @ApiResponse({ status: 200, description: 'Time slot updated successfully' })
  @ApiResponse({ status: 404, description: 'Time slot not found' })
  @ApiBody({ type: UpdateTimeSlotDto })
  @ApiParam({ name: 'id', description: 'The ID of the time slot' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTimeSlotDto: UpdateTimeSlotDto,
  ): Promise<TimeSlot> {
    return this.timeSlotService.update(id, updateTimeSlotDto);
  }

  @ApiOperation({ summary: 'Delete a time slot by ID' })
  @ApiResponse({ status: 200, description: 'Time slot deleted successfully' })
  @ApiResponse({ status: 404, description: 'Time slot not found' })
  @ApiParam({ name: 'id', description: 'The ID of the time slot' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<TimeSlot> {
    return this.timeSlotService.delete(id);
  }

  @ApiOperation({ summary: 'Get available time slots for a specific date' })
  @ApiResponse({
    status: 200,
    description: 'Available time slots retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'No available time slots found for the date',
  })
  @ApiParam({
    name: 'date',
    description: 'The date for which to find available time slots',
  })
  @Get('available/:date')
  async findAvailable(@Param('date') date: string): Promise<TimeSlot[]> {
    return this.timeSlotService.findAvailable(date);
  }
}
