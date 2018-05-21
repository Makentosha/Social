const express = require('express');
const session = require('express-session');
const path = require('path');
const router = express.Router();
const mysql = require('mysql');
const qs = require('querystring');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "social"
})

router.get('/', (req, res) => {
	if (!req.session.user)
		res.render("login");
	else {
		console.log(req.session.user);
		res.render("home", {user: req.session.user});
	}
})

router.get('/login', (req, res) => {
	res.render("login");
})

router.get('/login.css', (req, res) => {
	res.setHeader('content-type', 'text/css');
	res.sendFile(path.join(__dirname, '../public/style', 'login.css'));
})

router.get('/home', (req, res) => {
	if (!req.session.user)
		res.render("login");
	else {
		console.log(req.session.user);
		res.render("home", {user: req.session.user});
	}
})

router.post('/login', (req, res) => {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk;
	})

	req.on('end', () => {
		body = qs.parse(body);

		con.query(`SELECT * FROM users WHERE email='${body.email}'`, (err, result) => {
			if (result.length == 0) {
				res.end('');
			} else {
				bcrypt.compare(body.password, result[0].password, (err, re) => {
					if (err) throw err;

					//here log in user
					delete result[0].password;
					req.session.user = result[0];
					res.end("true");
				})
			}
		});
	})
})

router.post('/register', (req, res) => {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk;
	})

	req.on('end', () => {
		body = qs.parse(body);

		con.query(`SELECT email FROM users WHERE email='${body.email}'`, (error, results, fields) => {
			if (results.length) {
				res.end(JSON.stringify({err: 'email exists'}));
			} else {
				bcrypt.hash(body.password, saltRounds, (err, hash) => {	
					var q = `INSERT INTO users (first_name, last_name, sex, birthday, registration_date, email, password) values ('${body.firstName}', '${body.lastName}', '${body.sex}', '${body.birthday}', '2018-05-15', '${body.email}', '${hash}')`
					con.query(q, (err, result) => {
						if (err) {
							throw err;
						}
						console.log("1 row affected.")
					});
					res.end("succses");
				})
			}
		});
	})
})


router.post('/logout', (req, res) => {
	req.session.user = undefined;
	res.end();
})

module.exports = router;