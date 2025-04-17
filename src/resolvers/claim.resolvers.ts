import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateClaimDTO } from 'src/dto/claim/create-claim.dto';
import { Claim } from 'src/models/claim.models';
import { User } from 'src/models/user.models';
import { ClaimService } from 'src/services/claim.services';

@Resolver()
export class ClaimResolver {
  constructor(private claimService: ClaimService) {}

  //**
  // QUERIES
  // */
  @Query(() => [Claim])
  getUsersClaims(@Args('id') id: string) {
    return this.claimService.getUsersClaims(id);
  }

  //   @Query(() => String)
  //   getClaimById(@Args('id') id: string) {
  //     return this.claimService.getClaimById(id);
  //   }

  //**
  // MUTATIONS
  // */

  @Mutation(() => User)
  createClaim(@Args('data') data: CreateClaimDTO) {
    return this.claimService.createClaim(data);
  }
}
