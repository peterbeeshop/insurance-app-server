/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.services';
import { LoginUserDTO } from 'src/dto/user/login-user.dto';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * HELPER FUNCTIONS
   */
  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (user) {
      if (user.password && bcrypt.compareSync(password, user.password)) {
        //remove the password field from returned data;
        const { password: userPassword, ...restOfData } = user;
        return restOfData;
      } else {
        return null;
      }
    }
    return null;
  }

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

  //find a user using their email;
  async findUserByEmail(email: string) {
    try {
      return await this.databaseService.user.findFirst({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error('Error retrieving user by email');
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

          // Check if email is taken before proceeding
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

  async login(data: LoginUserDTO) {
    try {
      const { email, password } = data;
      const user = await this.validateUser(email, password);

      if (!user) {
        throw new Error('Invalid login credentials. Try again!');
      }

      return user;
    } catch (error) {
      throw new Error('An error occured while trying to login. Try again ');
    }
  }
}
