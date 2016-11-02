import ms from 'ms';
import packageJSON from '../package.json';

/**
 * Hapi plugin to serve static files with a predefined configuration
 * @type {Object}
 */
const HapiStaticFiles = {

  /**
   * @param  {hapi.Server}  server
   * @param  {Object}       options
   * @param  {string}       options.path
   * @param  {Function}     next
   */
  register(server, options, next) {
    const { path } = options;

    /**
     * Static file serving
     */
    server.route({
      method: 'GET',
      path: '/{param*}', // /styles/main.css
      handler: {
        directory: {
          path
        }
      },
      config: {
        description: 'Static files of the application',
        cors: true,
        cache: {
          expiresIn: ms('1y')
        },
        tags: ['static']
      }
    });

    next();
  }

};

HapiStaticFiles.register.attributes = {
  pkg: packageJSON,
  dependencies: ['inert']
};

export default HapiStaticFiles;
