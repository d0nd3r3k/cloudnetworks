
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Imager = require('imager')
  , async = require('async')
  , Medium = mongoose.model('Medium')
  , _ = require('underscore')

/**
 * Find medium by id
 */

exports.medium = function(req, res, next, id){
  var User = mongoose.model('User')

  Medium.load(id, function (err, medium) {
	if (err) return next(err)
	if (!medium) return next(new Error('Failed to load medium ' + id))
	req.medium = medium
	next()
  })
}

/**
 * New medium
 */

exports.new = function(req, res){
  res.render('media/new', {
	title: 'New Medium',
	medium: new Medium({})
  })
}

/**
 * Create a medium
 */

exports.create = function (req, res) {
  var medium = new Medium(req.body)
  medium.user = req.user

  medium.uploadAndSave(req.files.image, function (err) {
	if (err) {
	  res.render('media/new', {
		title: 'New Medium',
		medium: medium,
		errors: err.errors
	  })
	}
	else {
	  res.redirect('/media/'+medium._id)
	}
  })
}

/**
 * Edit a medium
 */

exports.edit = function (req, res) {
  res.render('media/edit', {
	title: 'Edit '+req.medium.title,
	medium: req.medium
  })
}

/**
 * Update medium
 */

exports.update = function(req, res){
  var medium = req.medium
  medium = _.extend(medium, req.body)

  medium.uploadAndSave(req.files.image, function(err) {
	if (err) {
	  res.render('media/edit', {
		title: 'Edit Medium',
		medium: medium,
		errors: err.errors
	  })
	}
	else {
	  res.redirect('/media/' + medium._id)
	}
  })
}

/**
 * View an medium
 */

exports.show = function(req, res){
  res.render('media/show', {
	title: req.medium.title,
	medium: req.medium
  })
}

/**
 * Delete an medium
 */

exports.destroy = function(req, res){
  var medium = req.medium
  medium.remove(function(err){
	// req.flash('notice', 'Deleted successfully')
	res.redirect('/media')
  })
}

/**
 * List of Media
 */

exports.index = function(req, res){
  var page = req.param('page') > 0 ? req.param('page') : 0
  var perPage = 15
  var options = {
	perPage: perPage,
	page: page
  }

  Medium.list(options, function(err, media) {
	if (err) return res.render('500')
	Medium.count().exec(function (err, count) {
	  res.render('media/index', {
		title: 'List of Media',
		media: media,
		page: page,
		pages: count / perPage
	  })
	})
  })
}
