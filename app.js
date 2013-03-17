var restify = require('restify');
var app = restify.createServer({ name: 'yet another package manager for bower'});
app.use(restify.bodyParser());

var pm = require('./packman');

app.get('/packages', function (req, res, next) {
  pm.all(function (error, packages) {
    if (error) {
      res.status(500);
    }
    if (packages.length > 0) {
      res.send(packages);
    }
  });
});
app.get('/packages/:name', function (req, res, next) {
  pm.retrieve(req.params.name, function (error, pkg) {
    if (error) {
      res.send(400);
      return next();
    }
    if (pkg) {
      res.send(200,pkg);
    } else {
      res.send(404);
    }
  });
});

app.post('/packages', function (req, res, next) {
  var name = req.params.name, 
    url = req.params.url;
  if (!name || !url) {
    res.send(400);
  } else {
    pm.create(name, url, function (error, pkg) { 
      if (error) {
        res.send(500);
      } else {
        if (pkg) {
          res.send(201);
        } else {
          res.send(400);
        }
      }
    });
  }
});

app.get('/packages/search/:name', function (req, res, next) {
  res.send(405);
});

app.listen(8080, function () {
  console.log('%s, running at: %s', app.name, app.url);
});