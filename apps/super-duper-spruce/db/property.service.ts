import { gql } from 'apollo-server-core';
import { PropertyFilters, Property, PropertyFiltersType } from '../models/property.model';
import graphClient from './api-client';

const getPropertyInput = (dto: Property): Property => {
  const result = {
    name: dto.name,
    address: dto.address,
    city: dto.city,
    state: dto.state,
    zip: dto.zip,
    numberOfUnits: dto.numberOfUnits != null ? +dto.numberOfUnits : null,
    goLiveDate: dto.goLiveDate,
    createdAt: dto.createdAt || new Date(),
    isLive: dto.isLive == null ? true : dto.isLive,
  } as any;

  if (dto.id != null) result.id = dto.id;
  if (dto.legacyId != null) result.legacyId = +dto.legacyId;

  return result;
}

const getProperties = async (filters?: PropertyFilters): Promise<{ data: Property[], error?: any }> => {
  let filterInput = '';
  const filtersList = [];

  if (filters) {
    if (filters.modernId) filtersList.push({type: PropertyFiltersType.modernId, value: filters.modernId});
    if (filters.legacyId) filtersList.push({type: PropertyFiltersType.legacyId, value: filters.legacyId});
    if (filters.isLive !== undefined && filters.isLive !== null)
      filtersList.push({type: PropertyFiltersType.isLive, value: filters.isLive});
    if (filters.name) filtersList.push({type: PropertyFiltersType.name, value: filters?.name});
    if (filters.address) filtersList.push({type: PropertyFiltersType.address, value: filters?.address});
    if (filters.city) filtersList.push({type: PropertyFiltersType.city, value: filters?.city});
    if (filters.state) filtersList.push({type: PropertyFiltersType.state, value: filters?.state});
    if (filters.zip) filtersList.push({type: PropertyFiltersType.zip, value: filters?.zip});
    if (filters.numberOfUnits != null) filtersList.push({type: PropertyFiltersType.numberOfUnits, value: filters?.numberOfUnits});
    if (filters.goLiveDate) filtersList.push({type: PropertyFiltersType.goLiveDate, value: filters?.goLiveDate});
    if (filters.goLiveDateType) filtersList.push({type: PropertyFiltersType.goLiveDateType, value: filters?.goLiveDateType});

    filterInput = filtersList.map(x => `${x.type}: ${x.value}`).join(', ');
  }

  const {data: res} = await graphClient.query<{ getProperty: Property[] }>({
    query: gql`
      {
        getProperty(${filterInput}) {
          id,
          legacyId,
          name,
          address,
          city,
          state,
          zip,
          isLive,
          goLiveDate,
          numberOfUnits,
          createdAt,
          updatedAt
        }
      }
    `,
  })

  return { data: res.getProperty }
}

const addProperty = async (dto: Property): Promise<{ data: Property }> => {
  dto = getPropertyInput(dto);

  const {data: res} = await graphClient.mutate<{ addProperty: Property }>({
    mutation: gql`
      mutation addProperty($property: PropertyInput!) {
        addProperty(property: $property) {
          id,
          legacyId,
          name,
          address,
          city,
          state,
          zip,
          isLive,
          goLiveDate,
          numberOfUnits,
          createdAt,
          updatedAt,
        }
      }
    `,
    variables: {
      property: dto,
    },
  })

  return { data: res.addProperty }
}

const updateProperty = async (dto: Property): Promise<{data: Property}> => {
  dto = getPropertyInput(dto);

  const {data: res} = await graphClient.mutate<{ updateProperty: Property }>({
    mutation: gql`
      mutation updateProperty($property: PropertyInput!) {
        updateProperty(property: $property) {
          id,
          legacyId,
          name,
          address,
          city,
          state,
          zip,
          isLive,
          goLiveDate,
          numberOfUnits,
          createdAt,
          updatedAt,
        }
      }
    `,
    variables: {
      property: dto,
    },
  })

  return { data: res.updateProperty }
}

const PropertyService = {
  getProperties,
  addProperty,
  updateProperty,
}

export default PropertyService
