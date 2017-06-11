/* eslint no-use-before-define: 0, global-require: 0 */

require('babel-polyfill');

let env = (process && process.env && process.env.NODE_ENV) || 'dev';
if (env === 'production') env = process.env.APP_ENV;
else if (env === 'development') env = 'dev';
const environment = require(`./env/${env}.js`); // eslint-disable-line

console.log(`app config loading from ./env/${env}`); // eslint-disable-line

module.exports = Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiPort: 3001,
    sessionSecret: 'secret',
    app: {
        title: 'Jeopardy',
        description: 'Family & Friends Jeopardy Game Generator',
        head: {
            titleTemplate: 'Jeopardy',
            meta: [
                { name: 'description', content: 'React Boilerplate' },
                { charset: 'utf-8' },
                { property: 'og:site_name', content: 'Family Jeopardy' },
                { property: 'og:image', content: '' },
                { property: 'og:locale', content: 'en_US' },
                { property: 'og:title', content: 'Jeopardy' },
                { property: 'og:description', content: 'Jeopardy Generator' }
            ]
        }
    },
    homePagePermission: 'App.View'
}, environment);
