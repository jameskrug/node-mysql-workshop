var colors = require ('colors');

var mysql = require ("mysql");

var connection = mysql.createConnection({
	host : "localhost",
	user : "jameskrug",
	password : "",
	database : "addressbook"
});

connection.query("SELECT Account.email, AddressBook.name, Account.id FROM Account LEFT JOIN AddressBook ON (AddressBook.accountId = Account.id) ORDER BY Account.id;", function (err, result){
	if(err){
		console.log(err);
	}
	else{
	   var info = {};
	   result.forEach(function(x){
	       if (info[x.email]){
	           console.log("   "+x.name.blue);
	       }
	       else{
	           console.log("#".bold.yellow+x.id.toString().bold.yellow+": ".bold.yellow+x.email.yellow)
	           if (x.name){
	               console.log("   "+x.name.blue);
	           }
	           else{
	               console.log("----no address books----".red);
	           }
	           info[x.email] += x.name;
	       }
	    });
	}
	connection.end();
});