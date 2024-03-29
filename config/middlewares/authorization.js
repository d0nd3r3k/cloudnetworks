
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next()
};


/*
 *  User authorizations routing middleware
 */

exports.user = {
    hasAuthorization : function (req, res, next) {
      if (req.profile.id != req.user.id) {
        return res.redirect('/users/'+req.profile.id)
      }
      next()
    }
}


/*
 *  Article authorizations routing middleware
 */

exports.article = {
    hasAuthorization : function (req, res, next) {
      if (req.article.user.id != req.user.id) {
        return res.redirect('/articles/'+req.article.id)
      }
      next()
    }
}

/*
 *  Medium authorizations routing middleware
 */

exports.medium = {
    hasAuthorization : function (req, res, next) {
      if (req.medium.user.id != req.user.id) {
        return res.redirect('/media/'+req.medium.id)
      }
      next()
    }
}

/*
 *  Boxes authorizations routing middleware
 */

exports.box = {
    hasAuthorization : function (req, res, next) {
      if (req.box.user.id != req.user.id) {
        return res.redirect('/boxes/'+req.article.id)
      }
      next()
    }
}
