const express = require('express');
const session = require('express-session');
const path = require('path');
const router = express.Router();
const mysql = require('mysql');
const qs = require('querystring');

const util = require('util');

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
	let userID = req.session.user.user_ID;

	con.query(`SELECT country, city FROM users_information WHERE user_ID=${userID}`, (err, result) => {
		res.render('edit-profile', {user: req.session.user,
									info: result[0]});
	})
})

router.post('/basicinformation/savechanges', (req, res) => {
	let user = '';
	req.on('data', (chunk) => {
		user += chunk;
	})

	req.on('end', () => {
		user = JSON.parse(user);
		console.log(req.session.user.user_ID)
		con.connect((err) => {
			// if (err) throw err;
			let query = `UPDATE users SET first_name="${user.firstName}", last_name="${user.lastName}" WHERE user_ID=${req.session.user.user_ID}`;

			con.query(query, (err, result) => {
				if (err) throw err;
				console.log(result + " done");
			})
		})
	})

	res.end();
})

router.post('/edit-profile/:file', (req, res) => {
	console.log(req.params.file);
	res.render(req.params.file);
})

router.get('/edit-profile/:file', (req, res) => {
	res.setHeader('content-type', 'text/javascript')
	res.sendFile(path.join(__dirname, '../public/views/edit-profile', req.params.file));
})

module.exports = router;