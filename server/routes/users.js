var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var user = {
		firstname : "John",
		surname : "Barrie",
		address : "SW6, London"
	}
	res.setHeader('Content-Type', 'application/json');
  	res.send(JSON.stringify(user));
});

module.exports = router;
