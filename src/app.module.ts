import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseModule } from './database/database.modules';
import { UsersModule } from './modules/user.modules';
import { ClaimModule } from './modules/claim.modules';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      sortSchema: true,
    }),
    DatabaseModule,
    UsersModule,
    ClaimModule,
  ],
})
export class AppModule {}
