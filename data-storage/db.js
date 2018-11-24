const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

exports = MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  let dbo = db.db("vehicles");

  console.log("Database connected");

  // dbo.collection("testbus1").drop(function(err, delOK) {
  //   if (err) throw err;
  //   if (delOK) console.log("Collection deleted");
  //   db.close();
  // });
});