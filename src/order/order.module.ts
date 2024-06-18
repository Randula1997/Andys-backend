/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderSchema, Orders } from './schemas/order.schema';
import { TimeSlot, TimeSlotSchema } from 'src/timeslot/schemas/timeslot.schema';
import { TimeSlotController } from 'src/timeslot/timeslot.controller';
import { TimeSlotService } from 'src/timeslot/timeslot.service';
import { TimeslotModule } from 'src/timeslot/timeslot.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Orders.name, schema: OrderSchema },
    ]),
    TimeslotModule,
  ],
  controllers: [OrderController],
  providers: [OrderService ],
})
export class OrderModule {}
