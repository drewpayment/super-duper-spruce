import { LegacyProperty } from '../db/entities/legacy-property';
import { ModernProperty } from '../db/entities/modern-property';


export class PropertyResponse implements IPropertyResponse {
  id: string;
  name: string;
  legacyId: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  isLive: boolean;
  goLiveDate: Date;
  numberOfUnits: number;
  createdAt: Date;
  updatedAt?: Date | null;

  constructor(modern?: ModernProperty, legacy?: LegacyProperty) {
    if (modern) {
      this.id = modern.id;
      this.isLive = modern.isLive;
      this.goLiveDate = modern.goLiveDate;
      this.numberOfUnits = modern.numberOfUnits;

    }

    if (legacy) {
      this.address = legacy.address;
      this.city = legacy.city;
      this.state = legacy.state;
      this.zip = legacy.zip;
      this.createdAt = legacy.createdAt;
      this.updatedAt = legacy.updatedAt;
    }

    if (legacy && modern) {
      this.name = legacy.name;
      this.legacyId = legacy.id;
    } else if (modern) {
      this.name = modern.name;
      this.legacyId = modern.legacyId;
    }
  }
}

export interface IPropertyResponse {
  id: string;
  name: string;
  legacyId: number;
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
