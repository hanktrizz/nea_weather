angular.module('neaWeatherApp')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');

	$routeProvider
	.when("/", {
    	template: "<h1>This is the main page</h1><p><a href='#!/nowcast'>nowcast</a></p>"
    })
    .when('/nowcast', {
      	template: '<nowcast></nowcast>'
    })
    .when('/today', {
      	template: "<today></today>"
    })
    .otherwise({
        template : "<h1>None</h1><p>Nothing has been selected</p>"
    });;
}]);
