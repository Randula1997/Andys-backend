/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './schemas/order.schema';
import { TimeSlot } from 'src/timeslot/schemas/timeslot.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Orders') private readonly orderModel: Model<Orders>,
    @InjectModel('TimeSlot') private readonly timeSlotModel: Model<TimeSlot>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Orders> {
    const timeSlot = await this.timeSlotModel
      .findById(createOrderDto.timeSlotId)
      .exec();
    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    const createdOrder = new this.orderModel(createOrderDto);
    const savedOrder = await createdOrder.save();

    timeSlot.orders.push(savedOrder.id);
    await timeSlot.save();

    return savedOrder;
  }

  async findAll(): Promise<Orders[]> {
    return this.orderModel.find().exec();
  }
}
