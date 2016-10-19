var colors = require ('colors');

var mysql = require ("mysql");

var connection = mysql.createConnection({
	host : "localhost",
	user : "jameskrug",
	password : "",
	database : "addressbook"
});

function notEmpty(x){
    if (x){
        return true;
    }
    else{
        return false;
    }
}

connection.query(`SELECT 
    Account.id, 
    Account.email, 
    AddressBook.id AS "abID",
    AddressBook.name,
    Entry.id AS "eID",
    Entry.firstName,
    Entry.lastName
FROM Account
LEFT JOIN AddressBook
    ON (AddressBook.accountId = Account.id)
JOIN Entry
    WHERE (Entry.addressbookId = AddressBook.id)
;`, function (err, result){
	if(err){
		console.log(err);
	}
	else{
	   //console.log(result);
	   var blank = {};
	   var info = [];
	   result.forEach(function(x){
	       if (!info[x.id]){
	           info[x.id] = ({
	               id : x.id,
	               email : x.email,
	               addressbooks : []
	           });
	       }
	       if (!info[x.id].addressbooks[x.abID]){
	           info[x.id].addressbooks[x.abID] = ({
	               id : x.abID,
	               name : x.name,
	               entries : []
	           });
	       }
	       if (!info[x.id].addressbooks[x.abID].entries[x.eID]){
	           info[x.id].addressbooks[x.abID].entries[x.eID] = ({
	               id : x.eID,
	               firstName : x.firstName,
	               lastName : x.lastName
	           });
	       }
	   });
	}
	
	var filteredArray = info.filter(notEmpty);
	
	for (var i = 0; i < filteredArray.length; i++){
	    filteredArray[i].addressbooks = filteredArray[i].addressbooks.filter(notEmpty);
	}
	
	for (var i = 0; i < filteredArray.length; i++){
	    for (var j = 0; j < filteredArray[i].addressbooks.length; j++){
	        filteredArray[i].addressbooks[j].entries = filteredArray[i].addressbooks[j].entries.filter(notEmpty);
        }
	}
	
	
	for (var i = 0; i < filteredArray.length; i++){
	    console.log("ID: "+filteredArray[i].id + " EMAIL: " + filteredArray[i].email);
	    for (var j = 0; j < filteredArray[i].addressbooks.length; j++){
	        console.log("     ID: " +filteredArray[i].addressbooks[j].id + " NAME: "+ filteredArray[i].addressbooks[j].name);
            for (var k = 0; k < filteredArray[i].addressbooks[j].entries.length; k++){
                console.log("          ID: " +filteredArray[i].addressbooks[j].entries[k].id + " FIRSTNAME: "+ filteredArray[i].addressbooks[j].entries[k].firstName +" LASTNAME: "+ filteredArray[i].addressbooks[j].entries[k].lastName);
            }
	       
	    }
	}
	connection.end();
});