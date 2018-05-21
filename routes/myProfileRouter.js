const express = require('express');
const session = require('express-session');
const path = require('path');
const router = express.Router();
const mysql = require('mysql');
const qs = require('querystring');

let con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "social"
})

router.get('/', (req, res) => {
	if (!req.session.user) {
		res.render('login')
	} else {
		res.render('my-profile', {user: req.session.user});
	}
})

router.post('/timeline', (req, res) => {
	res.end("nothing yet");
})

router.post('/about', (req, res) => {
	res.end("nothing yet");
})

router.post('/album', (req, res) => {
	let userID = req.session.user.user_ID;
	
	con.query(`SELECT photo_number, likes, dislikes FROM photos WHERE user_ID=${userID}`, (err, result) => {
		res.render("my-photos", {photos: result});
	})
	// res.end();
})

router.post('/friends', (req, res) => {
	res.end("nothing yet");
})

router.post('/Edit-profile', (req, res) => {
	res.render('edit-profile', {user: req.session.user});
})

module.exports = router;