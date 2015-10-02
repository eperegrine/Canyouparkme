//Server
var express = require('express');
var app = express();
//Logic
var fs = require('fs');
var BabyParse = require('babyparse');
var LongLat = require("./lib/distcalc.js");

app.use(express.static('public'));
app.use('/lib',express.static('lib'));

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
	console.log(LongLat);
});

//Handles all requests
app.use(function (request, res, next) {
	console.log(request.method + request.url);
	next();
});

app.get('/data', function (req, res) {
	fs.readFile('Data/CarParks.csv', 'utf8', function (err, data) {
		if (err) { console.error(err); }
		var parsed = BabyParse.parse(data);
		parsed.data = GetClosestCarParks(20, parsed.data);
		res.json(parsed);
	});
});

function GetClosestCarParks (numMarkers, data) {
	var CarParks = [];

	for (var i = data.length - 1; i > 0; i--) {
		var CarPark = data[i];
		var Distance = LongLat.findDist(
			{
				lat: 52.1081, 
				lon: -1.65344 }, 
			{
				lat: CarPark[3],
				lon: CarPark[2]} );
		if (Distance < 10) 
		{
			console.info(Distance);
			CarParks.push(CarPark);
			/*
			if (closestCarPark) {
				//One was assigned
				if (closestCarPark.distance > Distance) {
					closestCarPark = {
						data: CarPark,
						distance: Distance
					}
				}
			}
			else {
				closestCarPark = {
					data: CarPark,
					distance: Distance
				}
			}*/

			//console.log("Car Park %s", CarPark[1]);
		}
	}
	//console.log(CarParks);
	return CarParks;	
}