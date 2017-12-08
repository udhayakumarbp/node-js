'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Users = require('./schema.js');
const bodyparser = require('body-parser')
const port = 3000; 

mongoose.connect('mongodb://localhost/tarning', (err)=>{

	if (err) {

		console.log('Db Connection Failed');
	}

	console.log('Db Connection Sucessfully')

})


app.use(bodyparser.urlencoded({extend:true}));
app.use(bodyparser.json());


app.post('/', (req,res) =>{

	const user = new Users();

	user.name = req.body.name;
	user.age = req.body.age;

user.save ((err) => {

	if (err) {

		console.log('User Insert Failed');
	}
	res.json({msg : 'User Insert Sucessfully'})
})
})





app.get('/', (req, res)=>{
	Users.find((err, docs) =>{
		if (err) {
			console.log('users not find')
		}
        res.json(docs);
	})
})




app.get('/:id', (req, res)=>{
	let id = req.parmas.id;
	Users.findById(id, (err, doc) =>{
		if (err) {
			console.log('users not find')
		}
        res.json(doc);
	})
})


app.delete('/:id', (req, res)=>{
	let id = req.parmas.id;
	Users.findByIdAndRemove(id, (err, doc) =>{
		if (err) {
			console.log('users not find')
		}
        res.json({msg : "user deleted "});
	})
})




app.put('/:id', (req, res)=>{
	let id = req.parmas.id;
	const data = {
		name = req.body.name,
		age = req.body.age
	}
	Users.findByIdAndUpdate(id, data, { new : true }, (err, doc) =>{
		if (err) {
			console.log('users not find')
		}
        res.json(doc);
	})
})

 


app.listen(port, (err)=> {
   if (err) {
   	console.log('port not connected');
   }

     console.log('port connected ' + port);
}) 