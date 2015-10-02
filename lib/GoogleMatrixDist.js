function generateRequestURL (origLat, origLong, destinations) {
	//destLat, destLong
	//{lat: 00, long 00}
	var originStr = "origins=" + origLat + ',' + origLong;
	var destStr   = "destinations=";

	for (dest in destinations) {
		if (destStr == "destinations=") {
			destStr += dest.lat + ',' + dest.lon;
		}
		else {
			destStr += '|' + dest.lat + ',' + dest.lon;
		}
	}

	var url = "https://maps.googleapis.com/maps/api/distancematrix/json?";

	var retURL = url + originStr + "&" + destStr;
}