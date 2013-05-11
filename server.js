var express = require('express')
  , app = express()
  , fs = require('fs')
  , passport = require('passport')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , async = require('async');
  
// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/middlewares/authorization')
  , mongoose = require('mongoose')

// express settings
require('./config/express')(app, config, passport)

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path+'/'+file) 
})

// bootstrap passport config
require('./config/passport')(passport, config)

// Bootstrap routes
require('./config/routes')(app, passport, auth)

// Start the app by listening on <port>
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Sockets Arrays
var online_boxes = [],
    online_users = [],
    user_boxes = [];

//Start Socket.io Server
io.set('authorization', function (data, accept) {
    return accept(null, true);  
}).sockets.on('connection', function(socket){
    
    var CloudBox = mongoose.model('Box'),
        serial = "",
        user_id = "";
    
    socket.on('boxIsOnline',function(data){
        
        serial = data.serial;
        online_boxes[serial] = socket;
        console.log("box serial " + serial + " has just connected!");
        
        if(serial != ""){
          
          //Find box and update status to online, create it otherwise
          CloudBox.findOneAndUpdate({ serial: serial },{ $set: { status: "online" }},{ safe: true, upsert: true },
            function(err, box) {
              
              CloudBox.find('boxes').where('serial').equals(serial).exec(function(err, data){
                var box_serial = data[0].serial, 
                    ss = online_users[data[0].user];
                                        
                    ss.emit("boxIsOnline",{"serial": box_serial});

              });
            });
          }
    });
    
    socket.on('userIsOnline',function(data){
        user_id = data.id;
        online_users[user_id] = socket
    })
    /*socket.on('syncMedia', function(data){
      
      if(online_boxes[data[0].serial] === undefined){
        console.log('Error: Box is offline');   
      }
      else {
        var ss = online_boxes[data[0].serial]                    
        ss.emit("syncOnBox",data);
    }
    })*/
    
    socket.on('disconnect', function(){
      if(serial != ""){
        //Find box and update status to offline
        CloudBox.findOneAndUpdate({ serial: serial },{ $set: { status: "offline" }},{ safe: true, upsert: true },
          function(err, box) {
          CloudBox.find('boxes').where('serial').equals(serial).exec(function(err, data){
            var box_serial = data[0].serial, 
                ss = online_users[data[0].user];
                                    
                ss.emit("boxIsOffline",{"serial": box_serial});
          
          });
        });
       console.log("box serial " + serial + " has just disconnected!");
       }
    });
});