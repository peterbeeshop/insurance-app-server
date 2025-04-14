import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.modules';
import { UsersService } from 'src/services/user.services';
import { UsersResolver } from 'src/resolvers/user.resolvers';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
