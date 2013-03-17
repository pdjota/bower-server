var m = require('mongoose');
m.connect('mongodb://localhost/packages');
var schema = m.Schema({ 
  name: String, 
  url: String
});
var pkg = m.model('pkg', schema);

var all = function (callback) {
  return pkg.find({}, {_id:0}).select('name url').exec(callback);
};
var get = function (name, callback) {
  return pkg.findOne({name: name}, {_id:0}).select('name url').exec(callback);
};
var create = function (name, url, callback) {
  pkg.create({name: name, url: url}, callback);
};
var findAll = function (name, callback) {
  return pkg.find({name: new RegExp(name)}, {_id:0});
};

module.exports = {
  all: all,
  retrieve: get,
  create: create,
  search: findAll
}