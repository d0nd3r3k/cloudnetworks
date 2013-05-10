
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
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',')
}

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',')
}

/**
 * Box Schema
 */

var BoxSchema = new Schema({
  name: {type : String, default : '', trim : true},
  serial: {type : String, default : '', trim : true},
  user: {type : Schema.ObjectId, ref : 'User'},
  status: {type : String, default : 'offline', trim : true},
  tags: {type: [], get: getTags, set: setTags},
  media: [{
      cdnUri: { type : String },
      files: [],
      createdAt: { type : Date, default : Date.now }
    }],
  createdAt  : {type : Date, default : Date.now}
})

/**
 * Validations
 */

BoxSchema.path('name').validate(function (title) {
  return title.length > 0
}, 'Box name cannot be blank')

BoxSchema.path('serial').validate(function (body) {
  return body.length > 0
}, 'Box serial cannot be blank')

/**
 * Pre-remove hook
 */

BoxSchema.pre('remove', function (next) {
    
  next()
})

/**
 * Methods
 */

BoxSchema.methods = {

  /**
   * Save box 
   *
   * @param {Function} cb
   * @api private
   */
  uploadAndSave: function (cb) {
        var self = this
        self.save(cb)
  },  
  saveMedia: function (images, cb) {
      var imager = new Imager(imagerConfig, 'S3')
      var self = this
  
      imager.upload(images, function (err, cdnUri, files) {
        if (err) return cb(err)
        if (files.length) {
            self.media.push({
              cdnUri: cdnUri,
              files: files
            })
        }
        self.save(cb)
      }, 'medium')
    }
  
}
/**
 * Statics
 */

BoxSchema.statics = {

  /**
   * Find box by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('user', 'name email')
      .populate('comments.user')
      .exec(cb)
  },

  /**
   * List boxes
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('user', 'name')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}

mongoose.model('Box', BoxSchema)


