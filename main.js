//Server
var express = require('express');
var app = express();
//Logic
var fs = require('fs');
var BabyParse = require('babyparse');

app.use(express.static('public'));
app.use('/lib',express.static('lib'));

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/data', function (req, res) {
	fs.readFile('Data/CarParks.csv', 'utf8', function (err, data) {
		if (err) { console.error(err); }
		var parsed = BabyParse.parse(data);
		res.json(parsed);
	});
});