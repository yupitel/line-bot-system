'use strict';

const express        = require('express');
const path           = require('path');
const morgan         = require('morgan');
const methodOverride = require('method-override');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const extend         = require('extend');
const Config         = require('./config');
const Analyzer       = require('./lib/analyzer');


const App = {
  create: function () {
    const debug  = Config.debug || false;
    const port   = Config.port || 3000;
 
    const app = express();

    // port
    app.set('port', process.env.PORT || port);

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.set('json spaces', 2);
    
    // uncomment after placing your favicon in /public
    morgan.token('requestdata', (req, res) => {
      const log = [
        JSON.stringify(req.headers),
        JSON.stringify(req.params),
        JSON.stringify(req.query),
        JSON.stringify(req.body),
        JSON.stringify(res.locals)
      ].join('\t');
      return log;
    });

    morgan.token('errormessage', (req, res) => {
      let err = null;
      if (res.locals.err) {
        err = res.locals.err;
      }
      if (!err) {
        return null;
      }
      const log = [
        err.message,
        JSON.stringify(err)
      ].join('\t');
      return log;
    });
    
    // setup the logger
    app.use(morgan(':remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent :response-time ms :requestdata :errormessage'));
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(['9YWQsrTtdjoVpisT']));
    
    app.use(methodOverride());
    
    // public files
    app.use(express.static(path.join(__dirname, 'public')));
    
    // common module
    app.use((req, res, next) => {
      console.log('set common function');
      req.deug = debug;

      // merge object to data
      const data = {};
      extend(data, req.params, req.query, req.body);

      // set to req object
      req.data = data;
      console.log(req.data);

      next();
    });
    
    // set response module
    app.use(Analyzer.action);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      console.log('test 404');
      next(err);
    });

    // error handlers
    // development error handler
    if (app.get('env') === 'development') {
      app.use((err, req, res) => {
        res.locals.err = err;
        console.log('dev error');
        console.log(err.message);
        let result = -1;
        const status = err.status || 500;
        if (err.result) {
          result = err.result;
        }
        res.status(status).jsonp(
          {
            message: err.message,
            error  : err,
            result : result
          }
        );
      });
    } else {
      // production error handler
      // no stacktraces leaked to user
      app.use((err, req, res) => {
        res.locals.err = err;
        console.log('prod error');
        let result = -1;
        if (err.result) {
          result = err.result;
        }
        const status = err.status || 500;
        res.status(status).jsonp(
          {
            message: err.message,
            error  : {},
            result : result
          });
      });
    }

    return app;
  }
};

module.exports = App;
