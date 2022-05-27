var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    database:'my_db',
    user:'root',
    password:'root'

});
module.exports=connection;