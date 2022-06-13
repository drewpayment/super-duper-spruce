import { DataSource } from 'typeorm';
import { MODERN_ENTITIES } from './entities';

const orm = new DataSource({
  type: 'postgres',
  host: process.env.DB_MODERN_HOST,
  port: +process.env.DB_MODERN_PORT,
  username: process.env.DB_MODERN_USERNAME,
  password: process.env.DB_MODERN_PASSWORD,
  database: process.env.DB_MODERN_DATABASE,
  synchronize: false,
  logging: true,
  entities: MODERN_ENTITIES,
});

export async function modernDs() {
  return !orm.isInitialized ? await orm.initialize() : orm;
}
