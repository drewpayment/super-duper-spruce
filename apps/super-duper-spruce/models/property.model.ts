import { SearchDateType } from './search-date-type.enum';


export interface Property {
  id: string;
  name: string;
  legacyId: string|number;
  address: string;
  city: string;
  state: string;
  zip: string;
  isLive: boolean;
  goLiveDate: Date;
  numberOfUnits: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface PropertyFilters {
  modernId?: string;
  legacyId?: number;
  isLive?: boolean;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  numberOfUnits?: number;
  goLiveDate?: Date;
  goLiveDateType?: SearchDateType;
}

export enum PropertyFiltersType {
  modernId = 'modernId',
  legacyId = 'legacyId',
  isLive = 'isLive',
  name = 'name',
  address = 'address',
  city = 'city',
  state = 'state',
  zip = 'zip',
  numberOfUnits = 'numberOfUnits',
  goLiveDate = 'goLiveDate',
  goLiveDateType = 'goLiveDateType',
}
