//mongosh "mongodb+srv://cluster0.etl9scw.mongodb.net/myFirstDatabase" --apiVersion 1 --username srta_db --password 0100srta
//use test
try {
    db.users.updateOne({ useremail: "onew@gmail.com" }, { $set: { userstate: false } })
}
catch (err) {
    console.log(err);
}
