angular.module('neaWeatherApp')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');

	$routeProvider
	.when("/", {
    	template: "<h1>This is the main page</h1>" +
                  "<p><a href='#!/nowcast'>nowcast</a></p>" +
                  "<p><a href='#!/today'>today</a></p>" + 
                  "<p><a href='#!/fourDays'>Four Days</a></p>" + 
                  "<p><a href='#!/heavyRain'>Heavy Rain Warnings</a></p>" +
                  "<p><a href='#!/psi'>psi</a></p>" +
                  "<p><a href='#!/pm25'>PM 2.5</a></p>"
    })
    .when('/nowcast', {
      	template: '<nowcast></nowcast>'
    })
    .when('/today', {
      	template: "<today></today>"
    })
    .when('/fourDays', {
        template: "<four-days></four-days>"
    })
    .when('/heavyRain', {
        template: "<heavy-rain></heavy-rain>"
    })
    .when('/psi', {
        template: "<psi></psi>"
    })
    .when('/pm25', {
        template: "<pm25></pm25>"
    })
    .otherwise({
        template : "<h1>None</h1><p>Nothing has been selected</p>"
    });;
}]);
