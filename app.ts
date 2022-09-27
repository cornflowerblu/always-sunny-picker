import express, { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import * as path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan"
import { GraphQLClient } from "graphql-request";
import invariant from 'tiny-invariant';

// Set up the app
require('dotenv').config();
const indexRouter = require('./routes/index');
const episodeRouter = require('./routes/episode')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("SDKJHFSKJDFHSKJDFHKSJHFKSDJHFKSJHFKJDSHF"));

// Set up GraphQL Client and Admin Access. There will not be user-specific data just yet so we will use admin credentials but can easily define creds on a per-request basis.
const graphql = {
  url: process.env.GRAPHQL_URL,
  adminSecret: process.env.GRAPHQL_ADMIN_SECRET
}

invariant(graphql.url, 'GRAPHQL URL NOT SET!');
export const gqlClient = new GraphQLClient(graphql.url);

invariant(graphql.adminSecret, 'GRAPHQL SECRET NOT SET!');
export const adminRequestHeaders = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': graphql.adminSecret
};

const webpHeaders = {
  setHeaders: function (res: any, path: any, stat: any) {
    res.set("Accept", "image/avif,image/webp,image/*,*/*;q=0.8")
  }
};

app.use(express.static(path.join(__dirname, 'public'), webpHeaders));

// Register routers
app.use('/', indexRouter, episodeRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  if (req.app.get('env') === 'development') {
    res.locals.message = err.message;
    res.locals.error = err;

    // render the error page
    res.status(err.status || 500);
    res.render('error-dev');
  } else {
    // render a user-friendly page for production
    res.status(err.status || 500);
    res.render('error');
  }

});

module.exports = app;
