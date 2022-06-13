import { ArgsType, Field, Int } from 'type-graphql';
import { SearchDateType } from '../../models/search-date.enum';

@ArgsType()
export class GetPropertyQuery {
  @Field(() => String, {nullable: true})
  modernId?: string;

  @Field(() => Int, {nullable: true})
  legacyId?: number;

  @Field({nullable: true})
  isLive?: boolean;

  @Field(() => String, {nullable: true})
  name?: string;

  @Field(() => String, {nullable: true})
  address?: string;

  @Field(() => String, {nullable: true})
  city?: string;

  @Field(() => String, {nullable: true})
  state?: string;

  @Field(() => String, {nullable: true})
  zip?: string;

  @Field(() => Int, {nullable: true})
  numberOfUnits?: number;

  @Field(() => Date, {nullable: true})
  goLiveDate?: Date;

  @Field(() => SearchDateType, {nullable: true})
  goLiveDateType?: SearchDateType;
}
