const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  const dbo = db.db("vehicles");

  dbo.createCollection("testbus1", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });

  // dbo.collection("testbus1").drop(function(err, delOK) {
  //   if (err) throw err;
  //   if (delOK) console.log("Collection deleted");
  //   db.close();
  // });
});