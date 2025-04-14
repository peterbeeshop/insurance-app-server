import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/models/user.models';
import { UsersService } from 'src/services/user.services';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
