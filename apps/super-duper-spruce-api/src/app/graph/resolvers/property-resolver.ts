import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { Property } from '../types/property';
import { GetPropertyQuery } from '../types/property-query.args';
import { PropertyInput } from '../types/property-input';
import PropertyService from '../../services/property.service';

@Resolver(() => Property)
export class PropertyResolver {
  @Query(() => String)
  hello() {
    return 'world';
  }

  @Query(() => [Property])
  async getProperty(
    @Args() args: GetPropertyQuery
  ): Promise<Property[]> {
    return await PropertyService.getProperties(args);
  }

  @Mutation(() => Property)
  async updateProperty(@Arg('property') property: PropertyInput): Promise<Property> {
    const result = await PropertyService.updateProperty(property);

    // do some logging here
    if (result.hasError) return null;

    return result.data;
  }

  @Mutation(() => Property)
  async addProperty(@Arg('property') property: PropertyInput): Promise<Property> {
    const result = await PropertyService.addProperty(property);

    if (result.hasError) return null;

    return result.data;
  }

}
