# Angular 7 Boilerplate

1. Go to project folder and install dependencies:

```bash
npm install
```

2. Launch development server, and open `localhost:4200` in your browser:

```bash
npm start
```

## Project structure

```
dist/                        compiled version
documentation/               generated document source
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- core/                  core module (singleton services and single-use components)
|  |- shared/                shared module  (common components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app.routing.ts         app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- index.html                html entry point
|- styles.css                global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
```

## Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Tasks                   | Description                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| npm start               | Run development server on `http://localhost:4200/`                                |
| npm run build:dev       | Lint code and build app for development env in `dist/` folder                     |
| npm run build:prod      | Lint code and build app for production env in `dist/` folder                      |
| npm run build:local     | Lint code and build app for local env in `dist/` folder                           |
| npm run pwa:build:dev   | Lint code and build PWA app for development env in `dist/` folder                 |
| npm run pwa:build:prod  | Lint code and build PWA app for production env in `dist/` folder                  |
| npm run pwa:build:local | Lint code and build PWA app for local env in `dist/` folder                       |
| npm run lint            | Lint code                                                                         |
| npm run compodoc:gen    | Generate Project document in ./documentation folder                               |
| npm run compodoc:serve  | You can access ./documentation folder via `http://localhost:8080`                 |
| npm run compodoc        | It generate latest ./documentation and you can access via `http://localhost:8080` |

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

### Code scaffolding

Run `npm run generate -- component <name>` to generate a new component. You can also use
`npm run generate -- directive|pipe|service|class|module`.

If you have installed [angular-cli](https://github.com/angular/angular-cli) globally with `npm install -g @angular/cli`,
you can also use the command `ng generate` directly.

### PWA Service worker support

To enalbe service worker go to `src/main.ts` and uncomment service worker code.
