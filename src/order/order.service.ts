/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './schemas/order.schema';
import { TimeSlot } from 'src/timeslot/schemas/timeslot.schema';
import { BookedTimeSlot } from 'src/timeslot/schemas/bookedTimeslot.schema';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

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

  async findAll(paginationDto: PaginationDto): Promise<{ orders: Orders[], totalCount: number }> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;
    const orders = await this.orderModel.find()
    .sort({ date: -1 }) // Sort by date in descending order
    .skip(skip)
    .limit(limit)
    .populate('timeSlotId')
    .exec();

    const totalCount = await this.orderModel.countDocuments();

    return { orders, totalCount };
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Orders> {
    const { status } = updateOrderStatusDto;
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = status;
    return order.save();
  }
}
