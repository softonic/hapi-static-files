# hapi-static-files

Hapi plugin to serve static files with CORS enabled and maximum cache time.

Active maintainer: [ruben.norte@softonic.com](mailto:ruben.norte@softonic.com?subject=hapi-static-files)

## Installation

```bash
npm install hapi-static-files
```

## Usage

```javascript
// CommonJS
// const HapiStaticFiles = require('hapi-static-files');

// ES6
import HapiStaticFiles from 'hapi-static-files';

// Registration
server.register({
  register: HapiStaticFiles,
  options: {
    path: 'public' // Absolute path or relative to the root folder of the project.
  }
}, err => {});
```

## Testing

Clone the repository and execute:

```bash
npm test
```

## Contribute

1. Fork it: `git clone ssh://git@stash.redtonic:7999/NODE/hapi-static-files.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Check the build: `npm run build`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
