var mysql = require ("mysql");

var connection = mysql.createConnection({
	host : "localhost",
	user : "jameskrug",
	password : "",
	database : "mysql"
});

connection.query("show tables;", function (err, result){
	if(err){
		console.log(err);
	}
	else{
		result.forEach(function(table) {
			console.log(JSON.stringify(table.Tables_in_mysql, null, 3));
		});
	}
	connection.end();
});