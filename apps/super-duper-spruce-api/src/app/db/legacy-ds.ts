import { SetupTest } from '../../../tests/setup.spec';
import { DataSource } from 'typeorm';
import { environment } from '../../environments/environment';
import { LEGACY_ENTITIES } from './entities';

const orm = new DataSource({
  type: 'mysql',
  host: process.env.DB_LEGACY_HOST,
  port: +process.env.DB_LEGACY_PORT,
  username: process.env.DB_LEGACY_USERNAME,
  password: process.env.DB_LEGACY_PASSWORD,
  database: process.env.DB_LEGACY_DATABASE,
  synchronize: false,
  logging: true,
  entities: LEGACY_ENTITIES,
  debug: process.env.NODE_ENV !== 'production',
});

export async function legacyDs() {
  if (environment.testing) return await SetupTest.instance.legacyDs();
  return !orm.isInitialized ? await orm.initialize() : orm;
}
