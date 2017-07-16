/**
 * Created by nimishagoyal on 14/07/17.
 */

var username=prompt("Enter your username");

$(function(){
    var socket = io();
    $('#inp').keypress(function(e){
        if(e.keyCode===13)
            $('#btn').click();
    });
    $('#inp').focus(
        function(){
            $(this).val('');
        });
    $('#btn').click(function(){
        var input = $('#inp').val();
        socket.emit('receive_message', {user: username, input: input}); //custom event - receive message
        $('#inp').val('');
    });

    socket.on('get', function(data, users){
        // $('#messages').html('');

        console.log(data);
        console.log('<li><span>'+data.user+'</span> <span>'+data.input+'</span></li>');
        var msg = '<li class="msg"><span class="name">'+data.user+': </span> <span class="main">'+data.input+'</span></li>';
        $('#messages').append(msg);
        var messgs = document.getElementById("messages");
        messgs.scrollTop = messgs.scrollHeight;
        var propValue;
        $('#users').html('');
        for(var propName in users) {
            propValue = '<li>'+users[propName]+'</li>';
            $('#users').append(propValue);
        }
        // for(var i =0; i<data.length; i++){
        //     console.log('<li>'+data[i].user+": "+data[i].input+'</li>');
        //     $('#messages').append('<li>'+data[i].user+": "+data[i].input+'</li>')
        // }
        // var msg = '<li>'+data.user+": "+data.input+'</li>';
        // $('#messages').append(msg);
    });
    socket.on('all', function(data, users){
        data.forEach(client =>{
            console.log(data);
            var msg = '<li class="msg"><span class="name">'+client.user+': </span> <span class="main">'+client.input+'</span></li>';
            $('#messages').append(msg);
        })
        var propValue;
        $('#users').html('');
        for(var propName in users) {
            propValue = '<li>'+users[propName]+'</li>';
            $('#users').append(propValue);
        }
    });
    socket.emit('username', username);
    // socket.on('dconnect', function(data){
    //     console.log(data);
    //     $('#users').append(data);
    // })
});