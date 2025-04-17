import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Claim {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  description: string;

  @Field()
  contact_number: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field()
  status: string;
}
