/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSlotController } from './timeslot.controller';
import { TimeSlotService } from './timeslot.service';
import { TimeSlot, TimeSlotSchema } from './schemas/timeslot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TimeSlot.name, schema: TimeSlotSchema },
    ]),
  ],
  providers: [TimeSlotService],
  controllers: [TimeSlotController],
  exports: [
    TimeSlotService,
    MongooseModule.forFeature([
      { name: TimeSlot.name, schema: TimeSlotSchema },
    ]),
  ],
})
export class TimeslotModule {}
