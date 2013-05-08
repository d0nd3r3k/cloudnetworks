
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , async = require('async')
  , _ = require('underscore')

/**
 * Cloudbox is connected and online
 */

exports.index = function(req, res){
  var serial = req.params.serial;  
  res.render('cloudbox/index', { title: 'Cloudbox Serial: ' + serial, 'serial': serial });
}
