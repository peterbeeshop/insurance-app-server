import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.services';
import { CreateClaimDTO } from 'src/dto/claim/create-claim.dto';

@Injectable()
export class ClaimService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * QUERIES
   */

  //Get the all the claims that belong to a user
  async getUsersClaims(id: string) {
    try {
      return await this.databaseService.claim.findMany({
        where: { id },
      });
    } catch (error) {
      throw new Error('An error occured. Please try again');
    }
  }

  /**
   * MUTATIONS
   */
  async createClaim(data: CreateClaimDTO) {
    try {
      return await this.databaseService.claim.create({
        data,
      });
    } catch (error) {
      throw new Error('Error occured while creating claim. Try again');
    }
  }
}
