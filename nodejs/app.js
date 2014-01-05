
var mysql = require('mysql');
 
var client = mysql.createConnection({
  user: 'uno',
  password: 'uno'
});
 
client.query('USE prueba');
 
client.query(
  'INSERT INTO usuarios SET nombre = ?, password = ?',
  ['carlosro_ec', 'miclave']
);
 
client.query(
    'SELECT * FROM usuarios',
    function selectUsuario(err, results, fields) {
 
    if (err) {
        console.log("Error: " + err.message);
        throw err;
    }
 
    console.log("Number of rows: "+results.length);
    console.log(results);
 
    client.end();
});