 /**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Imager = require('imager')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , imagerConfig = require(config.root + '/config/imager.js')
  , Schema = mongoose.Schema

/**
 * Cloudox Schema
 */

var CloudBoxSchema = new Schema({
  serial: {type : String, default : '', trim : true},
  status: {type : String, default : '', trim : true},
  createdAt  : {type : Date, default : Date.now}
})

/**
 * Methods
 */

CloudBoxSchema.methods = {

  /**
   * Change box status
   *
   * @param {text} seril
   * @param {text} status
   */

  changeStatus: function (sn,st) {
  }
    
}
mongoose.model('CloudBox', CloudBoxSchema)
