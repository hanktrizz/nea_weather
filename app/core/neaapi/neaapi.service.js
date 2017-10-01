angular.module('core.neaapi')

.service('neaapi', ['$http', '$resource', function($http, $resource) {

	var url = "http://api.nea.gov.sg/api/WebAPI/?dataset=";
	var key = "&keyref=781CF461BB6606ADC49D8386041BBFD2708A29DB3A0C910C";
	
	var nowcastURL = url + "2hr_nowcast" + key;
	var todayURL = url + "24hrs_forecast" + key;
	
	var xml_to_json = function(xml) {
		var x2js = new X2JS();
		var json = x2js.xml_str2json(xml);
		return json;
	}
	
	var getResource = function(url) {
		return $resource(url, {}, {
			get: {
				method: 'GET',
				transformResponse: function(data, headers) {
					var x2js = new X2JS();
					var json = x2js.xml_str2json(data);
					return json; 
				}
			}
		});
	};


	this.nowcast = function() {		
		return getResource(nowcastURL);
	};

	this.today = function() {
		return getResource(todayURL);
	};

}]);
