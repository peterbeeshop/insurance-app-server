import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.modules';
import { ClaimResolver } from 'src/resolvers/claim.resolvers';
import { ClaimService } from 'src/services/claim.services';

@Module({
  imports: [DatabaseModule],
  providers: [ClaimService, ClaimResolver],
})
export class ClaimModule {}
