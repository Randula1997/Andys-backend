import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTimeSlotDto } from './dto/create-timeslot.dto';
import { UpdateTimeSlotDto } from './dto/update-timeslot.dto';
import { TimeSlot } from './schemas/timeslot.schema';
import { BookedTimeSlot } from './schemas/bookedTimeslot.schema';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectModel(TimeSlot.name) private readonly timeSlotModel: Model<TimeSlot>,
    @InjectModel(BookedTimeSlot.name)
    private readonly bookedTimeSlotModel: Model<BookedTimeSlot>,
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

  async update(
    id: string,
    updateTimeSlotDto: UpdateTimeSlotDto,
  ): Promise<TimeSlot> {
    return this.timeSlotModel
      .findByIdAndUpdate(id, updateTimeSlotDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<TimeSlot> {
    return this.timeSlotModel.findByIdAndDelete(id).exec();
  }
  async findAvailable(date: string): Promise<TimeSlot[]> {
    const bookingDate = new Date(date);

    const bookedTimeSlots = await this.bookedTimeSlotModel
      .find({ date: bookingDate, booked: true })
      .exec();

    const bookedTimeSlotIds = bookedTimeSlots.map(
      (bookedSlot) => bookedSlot.timeSlotId,
    );

    return this.timeSlotModel.find({ _id: { $nin: bookedTimeSlotIds } }).exec();
  }
}
