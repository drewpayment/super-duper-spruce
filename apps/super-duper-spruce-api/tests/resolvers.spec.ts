import { PropertyResolver } from '../src/app/graph/resolvers/property-resolver';
import { SetupTest } from './setup.spec';

beforeAll(async () => {
  await SetupTest.instance.setupTestDbs();
})

afterAll(() => {
  SetupTest.instance.teardownTestDb();
})

describe('testing PropertyResolver', () => {

  test('should get hello, world', async () => {
    const resolver = new PropertyResolver();
    const result = resolver.hello();

    expect(result).toBe('world');
  })

})
