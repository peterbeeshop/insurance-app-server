/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.services';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * QUERIES
   */

  async getAllUsers() {
    try {
      const res = await this.databaseService.user.findMany();
      return res;
    } catch (error) {
      throw new Error('Failed to fetch users. Try again!');
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
      });
      if (user) {
        return user;
      }
      return 'No user found';
    } catch (error) {
      throw new Error('Error retrieving user');
    }
  }

  /**
   * MUTATIONS
   */

  async createUser(data: CreateUserDTO) {
    try {
      return await this.databaseService.$transaction(
        async (prismaTransaction) => {
          const { email, password } = data;

          const isEmailTaken = await prismaTransaction.user.findUnique({
            where: { email },
            select: {
              id: true,
            },
          });

          if (isEmailTaken) {
            throw new ConflictException(`This email is already taken`);
          }

          // Hash the password
          const hashedPassword = bcrypt.hashSync(password, 10);

          const newUser = await prismaTransaction.user.create({
            data: {
              ...data,
              password: hashedPassword,
            },
          });

          return newUser;
        },
      );
    } catch (error) {
      throw new Error(
        'An error occured while creating new user, please try again.',
      );
    }
  }
}
