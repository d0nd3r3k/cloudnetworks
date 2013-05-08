
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , async = require('async')
  , Box = mongoose.model('Box')
  , _ = require('underscore')

/**
 * Find box by id
 */

exports.box = function(req, res, next, id){
  var User = mongoose.model('User')

  Box.load(id, function (err, box) {
    if (err) return next(err)
    if (!box) return next(new Error('Failed to load box ' + id))
    req.box = box
    next()
  })
}

/**
 * New box
 */

exports.new = function(req, res){
  res.render('boxes/new', {
    title: 'New Box',
    box: new Box({})
  })
}

/**
 * Create an box
 */

exports.create = function (req, res) {
  var box = new Box(req.body)
  box.user = req.user 

  box.uploadAndSave(function (err) {
    if (err) {
      res.render('boxes/new', {
        title: 'New Box',
        box: box,
        errors: err.errors
      })
    }
    else {
      res.redirect('/boxes/'+box._id)
    }
  })
}

/**
 * Edit an box
 */

exports.edit = function (req, res) {
  res.render('boxes/edit', {
    title: 'Edit '+req.box.title,
    box: req.box
  })
}

/**
 * Update box
 */

exports.update = function(req, res){
  var box = req.box
  box = _.extend(box, req.body)
    
  box.uploadAndSave(function(err) {
    if (err) {
      res.render('boxes/edit', {
        title: 'Edit Box',
        box: box,
        errors: err.errors
      })
    }
    else {
      res.redirect('/boxes/' + box._id)
    }
  })
}

/**
 * View an box
 */

exports.show = function(req, res){
  res.render('boxes/show', {
    title: req.box.title,
    box: req.box
  })
}

/**
 * Delete an box
 */

exports.destroy = function(req, res){
  var box = req.box
  box.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/boxes')
  })
}

/**
 * List of Boxes
 */

exports.index = function(req, res){
  
  
  var page = req.param('page') > 0 ? req.param('page') : 0
  var perPage = 15
  var options = {
    perPage: perPage,
    page: page
  }

  Box.list(options, function(err, boxes) {
    if (err) return res.render('500')
    Box.count().exec(function (err, count) {
      res.render('boxes/index', { 
        title: 'List of Boxes',
        boxes: boxes,
        page: page,
        pages: count / perPage
      })
    })
  })
}
