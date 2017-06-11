# Gorgo

Gorgo is a campaign audit application

![](http://www.dinosaurusi.com/video_slike/QYPcRyJCbz-Dinosaurus_-_Dinosaur_-_Dinosaurio_-_Dinosaure_-_Gorgosaurus001.jpg)

# Version

0.0.5

## Installation

```bash
yarn or npm install
```

Visit the [wiki](https://github.com/ZEFR-INC/gorgo/wiki/Python-&-PySpark-installation) for python install help


## Running Dev Server

```bash
npm run dev
```

The first time it may take a little while to generate the first `webpack-assets.json` and complain with a few dozen `[webpack-isomorphic-tools] (waiting for the first Webpack build to finish)` printouts, but be patient. Give it 30 seconds.

## Building and Running Production Server

```bash
npm run build-{env}
npm run start-{env}
```

### Using Generators To Create React Components
React components located in `src/components/<ComponentName>/`. The directory for the component contains the component itself (`<ComponentName>.js`), an `index.js` file that exports the component, a `tests` directory for component unit tests, and a `styles` directory for SASS files. 
Subcomponents can be also be added to the component's directory as needed.

The easiest way to create a new component is using the `redux-cli` generators and the blueprints provided. These generators will create the component directory structure and stub files you can begin using immediately.

1. install redux-cli globally `npm i redux-cli -g`
2. To create a "smart" Redux component:  `redux g smart <YourComponentName>` 
3. To create a "dumb" React component: `redux g dumb <YourComponentName>`

**Example**

```bash
$ redux g smart MySmartComponent
  info: installing blueprint...
  create: /react-app/src/components/MySmartComponent/MySmartComponent.js
  create: /react-app/src/components/MySmartComponent/tests/MySmartComponent.spec.js
  create: /react-app/src/components/MySmartComponent/index.js
  create: /react-app/src/components/MySmartComponent/styles/MySmartComponent.scss
  info: finished installing blueprint.
```

The generated unit test uses `enzyme` to do a shallow render, though it's intentionally designed to fail until it's been modified:

```bash
  1) (Component) MySmartComponentComponent renders without errors:
     AssertionError: expected 'MySmartComponent' to contain 'ADD UNIT TESTS FOR THIS COMPONENT'
      at Context.<anonymous> (MySmartComponent.spec.js:17:41)
```  

To include the module's scss, import it into `src/theme/app.scss` (or into any scss file `app.scss` imports):

```scss
/* src/theme/app.scss */
@import './variables.scss';

/* add scss file here */
@import '../components/MySmartComponent/styles/MySmartComponent.scss';
```

### Generating Redux Modules
1. Generate the module using `redux g duck <ModuleName>`
2. it should create a file in `src/redux/modules/<ModuleName>.js` and a test file in 
`src/tests/redux/modules/<ModuleName>.spec.js`
3. The module exports the reducers, action generators and action types. 
To use it, import the reducer into `src/redux/modules/reducer.js` and add it to the `combineReducers(...)` function call:

```javascript
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import myReduxModule from './MyReduxModule';

export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    myReduxModule
});
```

### Unit Testing

1. Run unit tests, coverage and linting with `npm test`
2. Run unit tests as a watcher with `npm run test:watch`
3. Run eslint by itself with `npm run test:lint`
4. Run tests and coverage without linting with `npm run test:coverage`

Code coverage is reported after the tests are run, and more complete HTML-based reports are generated in `artifacts/lcov-report/`, and can be viewed in your web browser.

### Generating Documentation from ESDoc
This framework uses [ESDoc](https://esdoc.org/) comments to generate documentation from ESDoc/JSDoc-style comments. Our ESLint rules will issue warnings when those comments are missing. 

To generate documentation use `npm run docs`. The doucmentation will be generated in `artifacts/docs` and can be vieweed in your web browser.



### Using Redux DevTools

[Redux Devtools](https://github.com/gaearon/redux-devtools) are enabled by default in development.

- <kbd>CTRL</kbd>+<kbd>H</kbd> Toggle DevTools Dock
- <kbd>CTRL</kbd>+<kbd>Q</kbd> Move DevTools Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detailed information.

If you have the
[Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) installed it will automatically be used on the client-side instead.

If you want to disable the dev tools during development, set `__DEVTOOLS__` to `false` in `/webpack/dev.config.js`.  
DevTools are not enabled during production.
