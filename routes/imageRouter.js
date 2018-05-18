const express = require('express');
const path = require('path');
const router = express.Router();
const mysql = require('mysql');
// const qs = require('querystring');

router.get('/:path/:img', (req, res) => {
	res.sendFile(path.resolve(__dirname + `/../public/images/${req.params.path}/${req.params.img}`));
})

module.exports = router;