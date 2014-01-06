var mysql = require('mysql')
// Let’s make node/socketio listen on port 3000
var io = require('socket.io').listen(3000)
// Define our db creds
var db = mysql.createConnection({
    user: 'uno',
    password: 'uno',
    database: 'prueba'
});

// Log any errors connected to the db
db.connect(function(err){
    if (err) console.log(err)
});
        var table = 'usuarios';
        
    io.sockets.on('connection', function (socket) {
        socket.on('login', function(usr, pass){
            
            //db.query('USE '+ database);

            db.query('SELECT nombre FROM '+ table +' WHERE nombre = "'+usr+'" AND password = "'+pass+'"', function(err, results) {
              if (err) throw err;
              if (results[0]) {
                socket.emit('return','true');
                console.log(results[0]);
              }
              else{
                socket.emit('return','false');
                console.log(results[0]);
              }
              db.end();
            });

        });
        socket.on('disconnect', function(){
            console.log('Server has disconnected');
        });
    });