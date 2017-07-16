/**
 * Created by nimishagoyal on 14/07/17.
 */

var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);//we're using http server but passing app to it - this replaces app.listen();

//socket needs http server
//to deliver files we need express server

var socket = require('socket.io');

var io = socket(server);//this function makes a connection b/w client and server and returns it
var msgs = [];
var connected_users={};
io.on('connection', function(socket){ //all events go inside this so tha† we dont have to create connection again and again
    //console.log(socket);
    console.log('connection established.');
    socket.on('receive_message', function(data) {
        //console.log(data);
        msgs.push(data);
        //connected_users.push({id: socket.id, user: data.user});
        //console.log(socket.id +"   "+ data.user);
        io.emit('get', data, connected_users);
    });
    socket.emit('all', msgs, connected_users);

    socket.on('username', function(data){
        console.log(data, socket.id);
        connected_users[socket.id]=data;
        console.log('connected_users= '+connected_users);
    });
    socket.on('disconnect', function(){
      delete  connected_users[socket.id];
       console.log(connected_users);
       console.log('disconnected');
    });
    //io.emit('')

});


app.use('/', express.static('public_static'));
server.listen(5000, function(){
    console.log("server is listening on port 5000");
});