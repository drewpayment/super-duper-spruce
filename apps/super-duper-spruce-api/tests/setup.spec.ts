import { DataSource } from 'typeorm';
import { LEGACY_ENTITIES, MODERN_ENTITIES } from '../src/app/db/entities';

export class SetupTest {

  private static _instance: SetupTest;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static get instance(): SetupTest {
    if (!this._instance) {
      this._instance = new SetupTest();
      this._instance.setupTestDbs();
    }
    return this._instance;
  }

  private modernDb!: DataSource;
  private legacyDb!: DataSource;

  async modernDs(): Promise<DataSource> {
    let ds: DataSource;
    try {
      if (this.modernDb.isInitialized) {
        ds = this.modernDb;
      } else {
        ds = await this.modernDb.initialize();
      }
    } catch (error) {
      //
    }
    return ds;
  }
  async legacyDs(): Promise<DataSource> {
    let ds: DataSource;
    try {
      if (this.legacyDb.isInitialized) {
        ds = this.legacyDb;
      } else {
        ds = await this.legacyDb.initialize();
      }
    } catch (error) {
      //
    }
    return ds;
  }

  async setupTestDbs() {
    try {
      this.modernDb = new DataSource({
        type: 'better-sqlite3',
        database: ':memory-modern:',
        entities: MODERN_ENTITIES,
        synchronize: true,
      });
      this.legacyDb = new DataSource({
        type: 'better-sqlite3',
        database: ':memory-legacy:',
        entities: LEGACY_ENTITIES,
        synchronize: true,
      });
    } catch (error) {
      //
    }
  }

  teardownTestDb() {
    try {
      if (this.modernDb.isInitialized)
        this.modernDb.destroy();
      if (this.legacyDb.isInitialized)
        this.legacyDb.destroy();
    } catch (error) {
      //
    }
  }

}
