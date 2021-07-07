const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const uri = "mongodb://localhost:27017/";
const dxb = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const datainsert = (data, collcn) =>
    new Promise((resolve, reject) => {
        dxb.connect(function (err, db) {
            if (err) reject();
            var dbo = db.db("databaseforbot");
            dbo.collection(collcn).insertOne(data, (err, result) => resolve(result));
            db.close();
        });
    });

const data = () =>
    new Promise((resolve, reject) => {
        dxb.connect(function (err, db) {
            if (err) reject();
            resolve(db);
        });
    });

const datafind = (query, collcn) =>
    new Promise((resolve, reject) => {
        dxb.connect(function (err, db) {
            if (err) reject();
            var dbo = db.db("databaseforbot");
            dbo.collection(collcn).findOne(query, (err, result) =>   console.log(result)            );
            db.close();
        });
    });

const dataupdate = (data,query, collcn) =>
    new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) reject();
            var dbo = db.db("databaseforbot");
            dbo
                .collection(collcn)
                .updateOne(query, data, (err, result) => resolve(result));
            db.close();
        });
    });

//module.exports.datainsert = datainsert;
//module.exports.datafind = datafind;
//module.exports.dataupdate = dataupdate;

var query = {
  allowabuse
  :
  1
  
};
collcn="xxx"
data().then((db)=>{

 var dbo = db.db("databaseforbot");
            dbo.collection(collcn).findOne(query, (err, result) =>   console.log(result)            );
            db.close();

})