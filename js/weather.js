angular.module('Weather', ['ngResource', 'ui.bootstrap']);

function WeatherCtrl($scope, $resource) {
	var latLng = {
		lat: '',
		lng: ''
	};
	var stringLoc = ''
	$scope.locationLookupResult = '...';
	$scope.alert = {type: 'danger', msg: 'Invalid zip code. Please try a different one.'};
	$scope.isShown = false;
	/*$scope.locationLookup = function() {
		
	};*/

	$scope.getWeather = function() {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( {address: $scope.searchZip}, function(result, status) {
			if(status == google.maps.GeocoderStatus.OK){
				  latLng.lat = result[0].geometry.location.lat();
				  latLng.lng = result[0].geometry.location.lng();
				  $scope.locationLookupResult = result[0].formatted_address;
				  $scope.weatherLookupResult = $resource('https://api.forecast.io/forecast/f1199b0ddb52ea5a28158b1425d24d80/' + latLng.lat + ',' + latLng.lng,
					{callback:'JSON_CALLBACK'},
					{get:{method:'JSONP'}}).get();
					var debugLine;
			}
			else {
				//alert('No results found. Try your search again.');
				$scope.isShown = true;
				$scope.weatherLookupResult = {};
				$scope.locationLookupResult = '...';
				console.log('Geocode was not successful for the following reason: ' + status);
			}
		});		
	};
	
	$scope.closeAlert = function() {
		$scope.isShown = false;
	};

}