import { Module } from '@nestjs/common';
import { DatabaseService } from './database.services';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
