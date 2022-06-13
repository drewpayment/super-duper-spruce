import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Property {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(type => Int)
  legacyId: number;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zip: string;

  @Field()
  isLive: boolean;

  @Field()
  goLiveDate: Date;

  @Field(type => Int)
  numberOfUnits: number;

  @Field()
  createdAt: Date;

  @Field({nullable: true})
  updatedAt?: Date;
}
