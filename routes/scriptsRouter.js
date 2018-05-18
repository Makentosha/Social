const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/:script', (req, res) => {
	res.setHeader('content-type', 'text/javascript')
	res.sendFile(path.join(__dirname, '../public/script', req.params.script))
})

module.exports = router;