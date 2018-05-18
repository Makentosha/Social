const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:file', (req, res) => {
	res.setHeader('content-type', 'text/css');
	res.sendFile(path.join(__dirname, '../public/style', req.params.file));
})

module.exports = router;