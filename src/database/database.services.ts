import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // Global timeout (in milliseconds)
      transactionOptions: {
        //MAX WAIT
        // This is how long Prisma will wait to acquire a transaction if the database is under heavy load
        // If it can't start the transaction within this time, it throws an error
        maxWait: 5000, // 5 seconds
        //TIMEOUT
        //If the transaction doesn't complete within this time, it will be rolled back and throw an error
        timeout: 10000, // 10 seconds
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
