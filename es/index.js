import packageJSON from '../package.json';

/**
 * Hapi plugin to serve static files with a predefined configuration
 * @type {Object}
 */
export default {
  pkg: packageJSON,

  dependencies: ['@hapi/inert'],
  /**
   * @param  {hapi.Server}  server
   * @param  {Object}       options
   * @param  {string}       options.path
   * @param  {Function}     next
   */
  register(server, options) {
    const { path } = options;

    /**
     * Static file serving
     */
    server.route({
      method: 'GET',
      path: '/{param*}', // /styles/main.css
      handler: {
        directory: {
          path,
        },
      },
      config: {
        description: 'Static files of the application',
        ext: {
          onPostHandler: {
            method(request, h) {
              // Check this as some error response do not have a `header` method
              // We can remove this once error management is improved in the application
              if (request.response && typeof request.response.header === 'function') {
                // Manually set the headers because Hapi uses the Origin request header instead of
                // the wildcard value (and sets Vary: Origin) and breaks caches
                request.response.header('Access-Control-Allow-Origin', '*');
                request.response.header('Access-Control-Allow-Headers',
                  'Origin, X-Requested-With, Accept, Content-Type, If-None-Match');
                request.response.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
              }
              return h.continue;
            },
          },
        },
        cache: {
          expiresIn: 31557600000,
        },
        tags: ['static'],
      },
    });
  },
};
