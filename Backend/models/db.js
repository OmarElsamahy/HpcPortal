const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
require('dotenv').config();

const url = process.env.url;
const userSchema = new mongoose.Schema({
    userfirstname: {
        type: String,
        lowercase: true,
        sparse: true,
        required: true
    },
    userlastname: {
        type: String,
        lowercase: true,
        sparse: true,
        required: true
    },
    userstate: { type: Boolean, required: true },
    useradded: { type: Boolean, required: true },
    userconfirmation: { type: Boolean, required: true },
    userrole: { type: String, required: true },
    useremail: { type: String, unique: true, required: true },
    userpassword: { type: String, unique: false, required: true },
});

// userSchema.pre('save',function(next){
//     this.userpassword = bcrypt.hashSync(this.userpassword,parseInt(process.env.saltrounds));
//        next();
// });

const users = mongoose.model('users', userSchema);

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


// Exporting our model objects
module.exports = {
    users
}