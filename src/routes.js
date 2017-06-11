/* eslint arrow-body-style: "off" */
/* eslint import/no-named-as-default: "off", import/no-named-as-default-member: "off" */
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Game from './components/Game';
import Creator from './components/Creator';
import NotFound from './components/NotFound';

/* may need to pass in store: export default (store) => {...} */
export default () => {
  /**
   * Please keep routes in alphabetical order
   */
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="create-game" component={Creator} />
            <Route path="play" component={Game} />
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
