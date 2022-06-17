import { SetupTest } from '../../../tests/setup.spec';
import PropertyService from './property.service';



beforeAll(async () => {
  await SetupTest.instance.setupTestDbs();
})

afterAll(() => {
  SetupTest.instance.teardownTestDb();
})

describe('PropertyService tests', () => {

  test('Should get list of properties via TypeORM', async () => {
    const result = await PropertyService.getProperties({ legacyId: 5 })

    expect(result).toBe([]);
  })

})
