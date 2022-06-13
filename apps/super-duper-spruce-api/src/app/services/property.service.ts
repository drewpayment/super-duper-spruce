import { LegacyProperty } from '../db/entities/legacy-property';
import { ModernProperty } from '../db/entities/modern-property';
import { legacyDs } from '../db/legacy-ds';
import { modernDs } from '../db/modern-ds';
import { Property } from '../graph/types/property';
import { OpResult } from '../models/op-result';
import { Guid } from 'guid-typescript';
import { GetPropertyQuery } from '../graph/types/property-query.args';
import { SearchDateType } from '../models/search-date.enum';
import { ILike, Raw } from 'typeorm';

const getSearchDateDirection = (direction: SearchDateType): string => {
  switch (direction) {
    case SearchDateType.lessThan:
      return '<';
    case SearchDateType.lessThanOrEqualTo:
      return '<=';
    case SearchDateType.greaterThan:
      return '>';
    case SearchDateType.greaterThanOrEqualTo:
      return '>=';
    case SearchDateType.equals:
    default:
      return '=';
  }
}

const getProperties = async ({
  legacyId,
  modernId,
  isLive,
  name,
  address,
  city,
  state,
  zip,
  numberOfUnits,
  goLiveDate,
  goLiveDateType = SearchDateType.equals,
}: GetPropertyQuery): Promise<Property[]> => {
  const mds = await modernDs();
  const lds = await legacyDs();
  let query = mds.createQueryBuilder(ModernProperty, 'property');

  if (legacyId)
    query = query.andWhere('property.legacyId = :legacyId', { legacyId });
  if (modernId) query = query.andWhere('property.id = :modernId', { modernId });
  if (isLive) query = query.andWhere('property.isLive = :isLive', { isLive });
  if (name) query = query.andWhere({ name: ILike(`%${name}%`) });
  if (numberOfUnits !== undefined && numberOfUnits !== null)
    query = query.andWhere('property.numberOfUnits = :numberOfUnits', { numberOfUnits });
  if (goLiveDate) {
    const searchDirection = getSearchDateDirection(goLiveDateType);
    query = query.andWhere({
      goLiveDate: Raw((dbVal) => `:goLiveDate ${searchDirection} ${dbVal}`, {
        goLiveDate,
      }),
    });
  }

  let results: Property[] = (await query.getMany()).map(
    (prop) =>
      ({
        id: prop.id,
        legacyId: prop.legacyId,
        name: prop.name,
        isLive: prop.isLive,
        goLiveDate: prop.goLiveDate,
        numberOfUnits: prop.numberOfUnits,
      } as Property)
  );

  const legacyIds = results.map((x) => x.legacyId);

  if (legacyIds && legacyIds.length) {
    let legacyQuery = lds
      .createQueryBuilder(LegacyProperty, 'property')
      .andWhere('property.id in (:...ids)', { ids: legacyIds });

    if (address)
      legacyQuery = legacyQuery.andWhere('property.address = :address', { address });
    if (city) legacyQuery = legacyQuery.andWhere('property.city = :city', { city });
    if (state) legacyQuery = legacyQuery.andWhere('property.state = :state', { state });
    if (zip) legacyQuery = legacyQuery.andWhere('property.zip = :zip', { zip });

    const legacyResults = await legacyQuery.getMany();

    if (address || city || state || zip)
      results = results.filter(x => legacyResults.some(lx => lx.id == x.legacyId));

    results = results.map((resp) => {
      const legacy = legacyResults.find((lr) => lr.id === resp.legacyId);

      if (!legacy) return resp;

      const merged = {
        ...resp,
        address: legacy.address,
        city: legacy.city,
        state: legacy.state,
        zip: legacy.zip,
        createdAt: legacy.createdAt,
        updatedAt: legacy.updatedAt,
      } as Property;

      if (legacy.name) merged.name = legacy.name;

      return merged;
    });
  }

  return results;
}

const updateProperty = async (dto: Partial<Property>): Promise<OpResult<Property>> => {
  const result = new OpResult<Property>(dto as Property);
  if (!dto.id)
    return result.setError('Missing ID');

  const mds = await modernDs();
  const lds = await legacyDs();

  const mqr = mds.createQueryRunner();
  const lqr = lds.createQueryRunner();

  await mqr.connect();
  await lqr.connect();

  await mqr.startTransaction();
  await lqr.startTransaction();

  try {
    const mrepo = mds.getRepository(ModernProperty);
    const lrepo = lds.getRepository(LegacyProperty);
    const curr = await mrepo.findOneBy({ id: dto.id, });

    if (dto.name !== undefined && curr.name !== dto.name)
      curr.name = dto.name;
    if (dto.isLive !== undefined && curr.isLive !== dto.isLive)
      curr.isLive = dto.isLive;
    if (dto.numberOfUnits !== undefined && curr.numberOfUnits !== dto.numberOfUnits)
      curr.numberOfUnits = dto.numberOfUnits;
    if (dto.goLiveDate !== undefined && curr.goLiveDate !== dto.goLiveDate)
      curr.goLiveDate = dto.goLiveDate;

    const mres = await mrepo.save(curr);
    await mqr.commitTransaction();

    const item = await lrepo.findOneBy({ id: mres.legacyId });

    if (dto.name !== undefined && item.name !== dto.name)
      item.name = dto.name;
    if (dto.address !== undefined && item.address !== dto.address)
      item.address = dto.address;
    if (dto.city !== undefined && item.city !== dto.city)
      item.city = dto.city;
    if (dto.state !== undefined && item.state !== dto.state)
      item.state = dto.state;
    if (dto.zip !== undefined && item.zip !== dto.zip)
      item.zip = dto.zip;
    item.updatedAt = new Date();

    const lres = await lrepo.save(item);
    await lqr.commitTransaction();

    result.setData({...dto,
      id: mres.id,
      legacyId: lres.id,
      name: lres.name,
      isLive: mres.isLive,
      numberOfUnits: mres.numberOfUnits,
      goLiveDate: mres.goLiveDate,
      address: lres.address,
      city: lres.city,
      state: lres.state,
      zip: lres.zip,
      createdAt: lres.createdAt,
      updatedAt: lres.updatedAt,
    } as Property);
  } catch (ex) {
    await mqr.rollbackTransaction();
    await lqr.rollbackTransaction();

    return result.setServerError('Failed to update the property. Please refresh and try again.');
  } finally {
    await mqr.release();
    await lqr.release();
  }

  return result;
}

const addProperty = async(dto: Partial<Property>): Promise<OpResult<Property>> => {
  const result = new OpResult<Property>(dto as Property);
  const mds = (await modernDs());
  const lds = (await legacyDs());

  const mqr = mds.createQueryRunner();
  const lqr = lds.createQueryRunner();

  await mqr.connect();
  await lqr.connect();

  await mqr.startTransaction();
  await lqr.startTransaction();

  try {
    const mrepo = mds.getRepository(ModernProperty);
    const lrepo = lds.getRepository(LegacyProperty);

    let lp = lrepo.create({
      name: dto.name,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      zip: dto.zip,
      createdAt: new Date(),
    });
    lp = await lrepo.save(lp);

    let mp = mrepo.create({
      id: Guid.create().toString(),
      legacyId: lp.id,
      name: lp.name,
      goLiveDate: dto.goLiveDate,
      isLive: dto.isLive,
      numberOfUnits: dto.numberOfUnits,
    });
    mp = await mrepo.save(mp);

    await mqr.commitTransaction();
    await lqr.commitTransaction();

    result.setData({
      id: mp.id,
      legacyId: mp.legacyId,
      address: lp.address,
      city: lp.city,
      state: lp.state,
      zip: lp.zip,
      name: mp.name,
      isLive: mp.isLive,
      goLiveDate: mp.goLiveDate,
      numberOfUnits: mp.numberOfUnits,
      createdAt: lp.createdAt,
    });
  } catch (ex) {
    await mqr.rollbackTransaction();
    await lqr.rollbackTransaction();

    result.setServerError('Failed to create new property.');
  } finally {
    await mqr.release();
    await lqr.release();
  }

  return result;
}

/**
 * API
 */
const PropertyService = {
  getProperties,
  addProperty,
  updateProperty,
}

export default PropertyService
