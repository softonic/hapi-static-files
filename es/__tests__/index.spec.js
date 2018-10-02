import hapi from 'hapi';
import Inert from 'inert';
import HapiStaticFiles from '../index';

async function createServerWithPlugin(options = {}) {
  const server = new hapi.Server();

  await server.register({
    plugin: Inert,
  });
  await server.register({
    plugin: HapiStaticFiles,
    options,
  });

  await server.start();

  return { server };
}

describe('HapiStaticFiles', () => {
  it('should be a Hapi plugin', () => {
    expect(HapiStaticFiles.register).toBeInstanceOf(Function);
    expect(HapiStaticFiles.pkg.name).toBe('hapi-static-files');
  });

  describe('when it is registered', () => {
    it('should set all the required headers', async () => {
      const { server } = await createServerWithPlugin({
        path: 'es/__tests__/fixtures',
      });

      const response = await server.inject('/test.css');

      expect(response.headers['access-control-allow-origin']).toBe('*');
      expect(response.headers['access-control-allow-headers']).toBe('Origin, X-Requested-With, Accept, Content-Type, If-None-Match');
      expect(response.headers['access-control-allow-methods']).toBe('GET, OPTIONS');
    });
  });
});
