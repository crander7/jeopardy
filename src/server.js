/* global __DEVELOPMENT__, __CLIENT__, __DEVTOOLS__, __DISABLE_SSR__, webpackIsomorphicTools */
/* eslint no-underscore-dangle: "off", no-console: "off", global-require: "off" */
import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import PrettyError from 'pretty-error';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import config from './config';
import createStore from './redux/create';
import Html from './helpers/Html';
import apiControl from './utils/apiController';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

injectTapEventPlugin();

app.use(compression());
app.use(cookieParser(config.sessionSecret));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.png')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// Middleware
app.get('/api/games', apiControl.getGames);

app.use((req, res) => {
    if (__DEVELOPMENT__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }
    const memoryHistory = createHistory(req.originalUrl);
    const store = createStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);
    const muiTheme = getMuiTheme({
        userAgent: req.headers['user-agent']
    });

    /**
     * hydrateOnClient
     * Renders the HTML to be sent to the client and sends it down
     * the wire.
     * @returns {undefined}
     */
    function hydrateOnClient() {
        const html = ReactDOM.renderToString(
            <Html assets={webpackIsomorphicTools.assets()} store={store} />
        );
        res.send(`<!doctype html>
${html}`);
    }


    if (__DISABLE_SSR__) {
        hydrateOnClient();
        return;
    }

    match(
                        { history, routes: getRoutes(store) },
                        (error, redirectLocation, renderProps) => {
                            if (redirectLocation) {
                                res.redirect(redirectLocation.pathname + redirectLocation.search);
                            } else if (error) {
                                console.error('ROUTER ERROR:', pretty.render(error));
                                res.status(500);
                                hydrateOnClient();
                            } else if (renderProps) {
                                const component = (
                                    <MuiThemeProvider muiTheme={muiTheme}>
                                        <Provider store={store} key="provider">
                                            <RouterContext {...renderProps} />
                                        </Provider>
                                    </MuiThemeProvider>

                                );

                                res.status(200);

                                global.navigator = { userAgent: req.headers['user-agent'] };

                                const html = ReactDOM.renderToString(
                                    <Html
                                        assets={webpackIsomorphicTools.assets()}
                                        component={component}
                                        store={store}
                                    />
                                );
                                res.send(`<!doctype html>
                    ${html}`);
                            } else {
                                res.status(404).send('Not found');
                            }
                        }
                    );
});

if (config.port) {
    server.listen(config.port, (err) => {
        if (err) {
            console.error(err);
        }
        console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
        console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
    });
} else {
    console.error('==>     ERROR: No PORT environment variable has been specified');
}
