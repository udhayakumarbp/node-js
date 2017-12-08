const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({

	name: String,
	age:Number

})

module.exports = mongoose.model('employees', users)