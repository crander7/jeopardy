/* global __DEVELOPMENT__, __CLIENT__, __DEVTOOLS__ */
/* eslint no-underscore-dangle: "off", no-console: "off", global-require: "off" */
/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'babel-polyfill';
import './theme/app.scss';
import createStore from './redux/create';

import getRoutes from './routes';

const dest = document.getElementById('content');
const store = createStore(browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);


const component = (
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
        {getRoutes(store)}
    </Router>
);

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={store} key="provider">
            {component}
        </Provider>
    </MuiThemeProvider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (
        !dest ||
        !dest.firstChild ||
        !dest.firstChild.attributes ||
        !dest.firstChild.attributes['data-react-checksum']
    ) {
        /* eslint-disable max-len */
        console.error('Server-side React render was discarded. Make sure initial render does not contain any client-side code.');
        /* eslint-enable max-len */
    }
}

