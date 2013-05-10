
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
      name: 'Cloudnetworks Cloud Server - Development'
    },
    facebook: {
      clientID: "371211122956820",
      clientSecret: "5c7850b638eae37894c55d42237782a9",
      callbackURL: "http://localhost:8080/auth/facebook/callback"
    },
    twitter: {
      clientID: "IDxMydmv0kbWRgH0ESGpNQ",
      clientSecret: "OCGTkWcUWsGs75Ca9vDoEvmrnXon7ELO3hbMsbg6OFU",
      callbackURL: "http://localhost:8080/auth/twitter/callback"
    },
    github: {
      clientID: 'edff7f6fa8786db9c78a',
      clientSecret: '1cafc8709a10cb33d98f6d34f0c94fc44c8116a1',
      callbackURL: 'http://localhost:8080/auth/github/callback'
    },
    google: {
      clientID: "33125564461.apps.googleusercontent.com",
      clientSecret: "L1qzCcoCzMWihIPacyjbHeOB",
      callbackURL: "http://localhost:8080/auth/google/callback"
    },
  },
  //TODO: fix API keys & Secret
  production: {
    db: 'mongodb://127.0.0.1/cloudnetworks',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Cloudnetworks Core - Production'
    },
    facebook: {
      clientID: "371211122956820",
      clientSecret: "5c7850b638eae37894c55d42237782a9",
      callbackURL: "http://50.116.27.203:8080/auth/facebook/callback"
    },
    twitter: {
      clientID: "IDxMydmv0kbWRgH0ESGpNQ",
      clientSecret: "OCGTkWcUWsGs75Ca9vDoEvmrnXon7ELO3hbMsbg6OFU",
      callbackURL: "http://50.116.27.203:8080/auth/twitter/callback"
    },
    github: {
      clientID: 'edff7f6fa8786db9c78a',
      clientSecret: '1cafc8709a10cb33d98f6d34f0c94fc44c8116a1',
      callbackURL: 'http://50.116.27.203:8080/auth/github/callback'
    },
    google: {
      clientID: "33125564461.apps.googleusercontent.com",
      clientSecret: "L1qzCcoCzMWihIPacyjbHeOB",
      callbackURL: "http://50.116.27.203:8080/auth/google/callback"
    },
    
  }
}
