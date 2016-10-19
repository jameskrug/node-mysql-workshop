var colors = require ('colors');

var mysql = require ("mysql");

var connection = mysql.createConnection({
	host : "localhost",
	user : "jameskrug",
	password : "",
	database : "addressbook"
});

connection.query("select id, email from Account where id <= 5;", function (err, result){
	if(err){
		console.log(err);
	}
	else{
	    result.forEach(function (x){
	       console.log("#".bold+ x.id.toString().bold + ": ".bold + x.email.yellow); 
	    });
	}
	connection.end();
});