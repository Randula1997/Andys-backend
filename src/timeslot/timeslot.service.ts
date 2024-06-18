import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTimeSlotDto } from './dto/create-timeslot.dto';
import { UpdateTimeSlotDto } from './dto/update-timeslot.dto';
import { TimeSlot } from './schemas/timeslot.schema';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectModel(TimeSlot.name) private readonly timeSlotModel: Model<TimeSlot>,
  ) {}

  async create(createTimeSlotDto: CreateTimeSlotDto): Promise<TimeSlot> {
    const createdTimeSlot = new this.timeSlotModel(createTimeSlotDto);
    return createdTimeSlot.save();
  }

  async findAll(): Promise<TimeSlot[]> {
    return this.timeSlotModel.find().exec();
  }

  async findOne(id: string): Promise<TimeSlot> {
    return this.timeSlotModel.findById(id).exec();
  }

  async update(id: string, updateTimeSlotDto: UpdateTimeSlotDto): Promise<TimeSlot> {
    return this.timeSlotModel.findByIdAndUpdate(id, updateTimeSlotDto, { new: true }).exec();
  }

  async delete(id: string): Promise<TimeSlot> {
    return this.timeSlotModel.findByIdAndDelete(id).exec();
  }
}
