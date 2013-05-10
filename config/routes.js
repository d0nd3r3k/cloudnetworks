var async = require('async')

module.exports = function (app, passport, auth) {

  // user routes
  var users = require('../app/controllers/users')
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/:userId', users.show)
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email', 'user_about_me'], failureRedirect: '/login' }), users.signin)
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), users.authCallback)
  app.get('/auth/github', passport.authenticate('github', { failureRedirect: '/login' }), users.signin)
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), users.authCallback)
  app.get('/auth/twitter', passport.authenticate('twitter', { failureRedirect: '/login' }), users.signin)
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), users.authCallback)
  app.get('/auth/google', passport.authenticate('google', { failureRedirect: '/login', scope: 'https://www.google.com/m8/feeds' }), users.signin)
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', scope: 'https://www.google.com/m8/feeds' }), users.authCallback)

  app.param('userId', users.user)

  //Cloudbox routes
  var cloudbox = require('../app/controllers/cloudbox')
  app.get('/cloudbox/connect/:serial', cloudbox.index)
  
  // article routes
  var articles = require('../app/controllers/articles')
  app.get('/articles', articles.index)
  app.get('/articles/new', auth.requiresLogin, articles.new)
  app.post('/articles', auth.requiresLogin, articles.create)
  app.get('/articles/:id', articles.show)
  app.get('/articles/:id/edit', auth.requiresLogin, auth.article.hasAuthorization, articles.edit)
  app.put('/articles/:id', auth.requiresLogin, auth.article.hasAuthorization, articles.update)
  app.del('/articles/:id', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy)

  app.param('id', articles.article)
  
  // Media routes
  var media = require('../app/controllers/media')
  app.get('/media', media.index)
  app.get('/media/new', auth.requiresLogin, media.new)
  app.post('/media', auth.requiresLogin, media.create)
  app.get('/media/:id', media.show)
  app.get('/media/:id/edit', auth.requiresLogin, auth.medium.hasAuthorization, media.edit)
  app.put('/media/:id', auth.requiresLogin, auth.medium.hasAuthorization, media.update)
  app.del('/media/:id', auth.requiresLogin, auth.medium.hasAuthorization, media.destroy)
  
  app.param('id', media.medium)
  
  
  // box routes
  var boxes = require('../app/controllers/boxes')
  app.get('/boxes', auth.requiresLogin, boxes.index)
  app.get('/boxes/new', auth.requiresLogin, boxes.new)
  app.post('/boxes', auth.requiresLogin, boxes.create)
  app.post('/boxes/:boxId/media', auth.requiresLogin, boxes.addMedia)
  app.get('/boxes/:boxId',auth.requiresLogin, boxes.show)
  app.get('/boxes/:boxId/edit', auth.requiresLogin, auth.box.hasAuthorization, boxes.edit)
  app.put('/boxes/:boxId', auth.requiresLogin, auth.box.hasAuthorization, boxes.update)
  app.del('/boxes/:boxId', auth.requiresLogin, auth.box.hasAuthorization, boxes.destroy)
  
  app.param('boxId', boxes.box)

  
  // home route
  app.get('/', auth.requiresLogin, boxes.index)

  // comment routes
  var comments = require('../app/controllers/comments')
  app.post('/articles/:id/comments', auth.requiresLogin, comments.create)

  // tag routes
  var tags = require('../app/controllers/tags')
  app.get('/tags/:tag', tags.index)

}
