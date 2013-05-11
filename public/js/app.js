$(document).ready(function () {

  // confirmations
  $('.confirm').submit(function (e) {
    e.preventDefault();
    var self = this;
    var msg = 'Are you sure?';
    bootbox.confirm(msg, 'cancel', 'Yes! I am sure', function (action) {
      if (action) {
        $(self).unbind('submit');
        $(self).trigger('submit');
      }
    });
  });

  $('#tags').tagsInput({
    'height':'60px',
    'width':'280px'
  });

  //Dashboard WebSockets
  var online = true;
  var socket_url = 'http://localhost:8080';
  
  if(online){
    socket_url = 'http://50.116.27.203:8080/';
  }
  
  var user_id = $('#user').data('id');  
  var socket = io.connect(socket_url);
  
  socket.emit('userIsOnline', {'id':user_id});
  
  
  socket.on('boxIsOnline', function (data){
    var serial = data.serial;
    
    $('.article[data-id='+serial+']').find('.status span').html('Status: Online');
    console.log("Box" + data.serial + "is Online")
  });
  
  socket.on('boxIsOffline', function (data){
    var serial = data.serial;
    
    $('.article[data-id='+serial+']').find('.status span').html('Status: Offline');
    console.log("Box" + data.serial + "is Offline")
  });
  
  //Sync Media
    var media = [];
    var box_serial = $('.serial').data('serial');
    $('.media').each(function(){
      var image = $(this).find('img').attr('src');
      
      var obj = {
        medium: image
      };
      media.push(obj);
    });
    var meta = [{'id':user_id, 'serial':box_serial}];
    meta.push(media)
    console.log(meta)
    socket.emit('syncMedia', meta);
  
});

