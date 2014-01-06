var io = require('socket.io');
var socket = io.listen(8124);
socket.sockets.on('connection',function(socket){
    socket.on('login', function(data, usr, pass){
        var mysql = require('mysql');
        var TEST_DATABASE = 'prueba';
        var TEST_TABLE = 'usuarios';
        var client = mysql.createClient({
          user: 'uno',
          password: 'uno',
        });

        client.query('USE '+TEST_DATABASE);

        client.query(
          'SELECT name FROM '+TEST_TABLE+' WHERE user = '+usr+' AND password = '+pass,
          function selectCb(err, results) {
            if (err) {
              throw err;
            }
            //Emit a message to client
            socket.emit('retuLogIn',{username: results[0]['name']});
            client.end();
          }
        );
    });
        socket.on('disconnect', function(){
            console.log('Server has disconnected');
        });
});