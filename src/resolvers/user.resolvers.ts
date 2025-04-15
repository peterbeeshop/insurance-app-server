import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { User } from 'src/models/user.models';
import { UsersService } from 'src/services/user.services';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  //**
  // QUERIES
  // */
  @Query(() => [User])
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Query(() => String)
  getUserById(@Args('id') id: string) {
    return this.usersService.getUserById(id);
  }

  //**
  // MUTATIONS
  // */

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserDTO) {
    return this.usersService.createUser(data);
  }
}
