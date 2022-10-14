/**
 * https://github.com/Angular-RU/angular-universal-starter/blob/master/server.ts
 */
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as compression from 'compression';

import * as express from 'express';
import { join } from 'path';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { environment } from './src/environments/environment';

const request = require('request');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
app.use(compression());

const redirectowww = false;
const redirectohttps = false;
const wwwredirecto = false;
app.use((req, res, next) => {

  // check if it is a secure (https) request
  // if not redirect to the equivalent https url
  if (
    redirectohttps &&
    req.headers['x-forwarded-proto'] !== 'https' &&
    req.hostname !== 'localhost'
  ) {
    res.redirect(301, 'https://' + req.hostname + req.url);
  }

  if (req.url === '/robots.txt') {
    next();
    return;
  }

  if (req.url === '/ads.txt') {
    next();
    return;
  }

  // www or not
  if (redirectowww && !req.hostname.startsWith('www.')) {
    res.redirect(301, 'https://www.' + req.hostname + req.url);
  }

  // www or not
  if (wwwredirecto && req.hostname.startsWith('www.')) {
    const host = req.hostname.slice(4, req.hostname.length);
    res.redirect(301, 'https://' + host + req.url);
  }

  // for test
  // if (test && req.url === '/test/exit') {
  //   res.send('exit');
  //   exit(0);
  //   return;
  // }

  console.log('environment: ', environment);
  next();
});

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  request(environment.rootHost + '/api/sitemap/xml').pipe(res);
});

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
// For errors not found 404, server error 500 etc.
app.get('*', (req, res) => {
  global['navigator'] = req['headers']['user-agent'];

  const http = req.headers['x-forwarded-proto'] === undefined ? 'http' : req.headers['x-forwarded-proto'];
  const url = req.originalUrl;

  // tslint:disable-next-line:no-console
  res.render(
    DIST_FOLDER,
    {
      req: req,
      res: res,
      providers: [
        {
          provide: REQUEST,
          useValue: req,
        },
        {
          provide: RESPONSE,
          useValue: res,
        },
        {
          provide: 'ORIGIN_URL',
          useValue: `${http}://${req.headers.host}`,
        },
      ],
    },
    (err, html) => {
      if (!!err) {
        throw err;
      }

      // tslint:disable-next-line:no-console
      console.timeEnd(`GET: ${url}`);
      res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
      res.send(html);
    },
  );
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
