import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.services';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUsers() {
    try {
      const res = await this.databaseService.user.findMany();
      return res;
    } catch (error) {
      console.log('error');
      throw new Error('Failed to fetch users. Try again!');
    }
  }
}
