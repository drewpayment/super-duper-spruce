import { registerEnumType } from 'type-graphql';


export enum SearchDateType {
  equals,
  lessThan,
  lessThanOrEqualTo,
  greaterThan,
  greaterThanOrEqualTo,
}

registerEnumType(SearchDateType, {
  name: 'SearchDateType',
  description: 'Search date options',
})
