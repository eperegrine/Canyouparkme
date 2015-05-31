var map;

function initialize() {
	var mapOptions = {
		zoom: 5,
		center: new google.maps.LatLng(51.8622087, 0.1629819)
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

	google.maps.event.addDomListener(window, 'load', initialize);

	google.maps.event.addListener(map, 'click', function(event) {
		placeMarker(event.latLng);
		console.log(event.latLng);
	});
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '&signed_in=true&callback=initialize&region=GB';
  document.body.appendChild(script);
}

window.onload = loadScript;

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;
   
   if (key == 32) {
   		//placeLatLongMarker(51.8622087,0.1629819);
   		jQuery.get('http://localhost:3000/data',function (response) {
			console.log(response);
			
			var closestCarPark; // {data: Array[4], distance: Float}

			var currentPosMarker = placeLatLongMarkerMessage(51.5072, 0.1275, "Your location");

			for (var i = response.data.length - 1; i > 0; i--) {
				var CarPark = response.data[i];
				var Distance = findDistance(
					{
						lat: 51.5072, 
						lon: 0.1275 }, 
					{
						lat: CarPark[3],
						lon: CarPark[2]} );
				if (Distance < 30) 
				{ // IF BLOCK START
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
					}

					console.log("Car Park %s", CarPark[1]);
					//placeLatLongMarker(CarPark[3],CarPark[2]);
				}
			} //END-FOR

			var marker = placeLatLongMarkerMessage(closestCarPark.data[3],
				closestCarPark.data[2],
				closestCarPark.data[1]);
			
			var infoWindow = new google.maps.InfoWindow({
								content: closestCarPark.data[1]
							});
			infoWindow.open(map, marker);
		});
   }
}

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location, 
        map: map
    });
    return marker;
}

function placeLatLongMarker(lat, longitude) {
	var myLatlng = new google.maps.LatLng(lat, longitude);
	return placeMarker(myLatlng);
}

function placeLatLongMarkerMessage (latitude, longitude, message) {
	var location = new google.maps.LatLng(latitude, longitude);

	var marker = new google.maps.Marker({
        position: location, 
        map: map,
        title: message
    })
    return marker;
}