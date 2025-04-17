import { Field, InputType } from '@nestjs/graphql';
import { ClaimType } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateClaimDTO {
  @Field()
  userId: string;

  @Field()
  @IsNotEmpty()
  // type: string;
  type: ClaimType;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNotEmpty()
  contact_number: string;

  @Field(() => String, { nullable: true })
  image?: string;
}
