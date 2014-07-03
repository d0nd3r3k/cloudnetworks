
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://localhost/cloudnetworks',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Cloudnetworks Cloud Core - Development'
    },
    facebook: {
      clientID: "",
      clientSecret: "",
      callbackURL: "http://localhost:8080/auth/facebook/callback"
    },
    twitter: {
      clientID: "",
      clientSecret: "",
      callbackURL: "http://localhost:8080/auth/twitter/callback"
    },
    github: {
      clientID: '',
      clientSecret: '',
      callbackURL: 'http://localhost:8080/auth/github/callback'
    },
    google: {
      clientID: "",
      clientSecret: "",
      callbackURL: "http://localhost:8080/auth/google/callback"
    },
  },
  //TODO: fix API keys & Secret
  
}
