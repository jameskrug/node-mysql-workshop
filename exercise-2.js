

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
	       console.log("#", x.id + ": " + x.email); 
	    });
	}
	connection.end();
});