//-----------------------------------------------------------------------------------------------
// initialization
//-----------------------------------------------------------------------------------------------

var application = new BroLarmApplication();
application.init();

function BroLarmApplication() {

  //-----------------------------------------------------------------------------------------------
  // public static constants
  //-----------------------------------------------------------------------------------------------

  // directories to route
  this.ROUTE_DIRECTORIES = [
    'css',
    'fonts',
    'images',
    'js',
    'js/app',
    'js/app/collections',
    'js/app/models',
    'js/app/views',
    'js/vendor'
  ];

  // file name of index page
  this.INDEX_FILE_NAME = 'index.html';

  //-----------------------------------------------------------------------------------------------
  // jQuery scope
  //-----------------------------------------------------------------------------------------------

  var $ = null;

  //-----------------------------------------------------------------------------------------------
  // private properties
  //-----------------------------------------------------------------------------------------------

  this._model = null;
  this._express = null;
  this._app = null;
  this._io = null;
  this._riley = null;

  //-----------------------------------------------------------------------------------------------
  // public methods
  //-----------------------------------------------------------------------------------------------

  this.init = function() {
    // set jQuery scope
    $ = require('jquery');

    this._riley = require('./js/api/riley');

    this.initServer();
  };

  //-----------------------------------------------------------------------------------------------
  // private callback handlers
  //-----------------------------------------------------------------------------------------------

  this.onServerHandler = function(directory, file, req, res) {
    var path = __dirname + '/' + directory + '/' + file;

    var fs = require('fs');
    fs.readFile(path,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading file');
      }
      res.writeHead(200);
      res.end(data);
    });

  };

  //-----------------------------------------------------------------------------------------------
  // private methods
  //-----------------------------------------------------------------------------------------------

  this.initServer = function() {
    var express = require('express');
    this._app = express();
    this._app.listen(process.env.PORT || 8001);

    this.initRoutes();
  };

  this.initRoutes = function() {
    this.initApiRoutes();

    // route to index.html
    this._app.get('/', $.proxy( this.onServerHandler, this, '.', this.INDEX_FILE_NAME));

    var fs = require('fs');
    // automatically set up routes to all CSS and JS files
    for (var i = 0; i < this.ROUTE_DIRECTORIES.length; i++) {
      // for each file in the asset directories
      fs.readdirSync(__dirname + '/' + this.ROUTE_DIRECTORIES[i]).forEach($.proxy(this.routeFile, this, [this.ROUTE_DIRECTORIES[i]]));
    }
  };

  this.initApiRoutes = function() {
    this._app.get('/api/user/:id', this._riley.getFriendsOnline);
  };

  this.routeFile = function(directory, file) {
    var route = '/' + directory + '/' + file;
    this._app.get(route, $.proxy(this.onServerHandler, this, directory, file));
  };

}
