/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './schemas/order.schema';
import { TimeSlot } from 'src/timeslot/schemas/timeslot.schema';
import { BookedTimeSlot } from 'src/timeslot/schemas/bookedTimeslot.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Orders') private readonly orderModel: Model<Orders>,
    @InjectModel('TimeSlot') private readonly timeSlotModel: Model<TimeSlot>,
    @InjectModel('BookedTimeSlot')
    private readonly bookedTimeSlotModel: Model<BookedTimeSlot>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Orders> {
    const timeSlot = await this.timeSlotModel
      .findById(createOrderDto.timeSlotId)
      .exec();
    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    const bookingDate = new Date(createOrderDto.date);
    let bookedTimeSlot = await this.bookedTimeSlotModel
      .findOne({ timeSlotId: createOrderDto.timeSlotId, date: bookingDate })
      .exec();

    if (bookedTimeSlot && bookedTimeSlot.booked) {
      throw new Error('Time slot is already booked for this date');
    }

    const createdOrder = new this.orderModel(createOrderDto);
    const savedOrder = await createdOrder.save();

    if (!bookedTimeSlot) {
      bookedTimeSlot = new this.bookedTimeSlotModel({
        timeSlotId: createOrderDto.timeSlotId,
        date: bookingDate,
        booked: true,
      });
    } else {
      bookedTimeSlot.booked = true;
    }

    await bookedTimeSlot.save();

    return savedOrder;
  }

  async findAll(): Promise<Orders[]> {
    return this.orderModel.find().exec();
  }
}
