import { Field, InputType, Int } from 'type-graphql';


@InputType()
export class PropertyInput {
  @Field({nullable: true})
  id?: string;

  @Field({nullable: true})
  name?: string;

  @Field(() => Int, {nullable: true})
  legacyId?: number;

  @Field({nullable: true})
  address?: string;

  @Field({nullable: true})
  city?: string;

  @Field({nullable: true})
  state?: string;

  @Field({nullable: true})
  zip?: string;

  @Field({nullable: true})
  isLive?: boolean;

  @Field({nullable: true})
  goLiveDate?: Date;

  @Field(() => Int, {nullable: true})
  numberOfUnits?: number;

  @Field({nullable: true})
  createdAt?: Date;

  @Field({nullable: true})
  updatedAt?: Date;
}
