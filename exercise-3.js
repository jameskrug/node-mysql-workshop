var colors = require ('colors');

var mysql = require ("mysql");

var connection = mysql.createConnection({
	host : "localhost",
	user : "jameskrug",
	password : "",
	database : "addressbook"
});

connection.query("select Account.email, AddressBook.name, Account.id from AddressBook join Account where(AddressBook.accountId = Account.id) order by Account.id;", function (err, result){
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
	           console.log("#".bold.yellow+x.id.toString().bold.yellow+": ".bold.yellow+x.email.yellow + "\n   " + x.name.blue);
	           info[x.email] += x.name;
	       }
	    });
	}
	connection.end();
});