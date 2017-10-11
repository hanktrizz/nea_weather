angular.module('heavyRain')
.component('heavyRain', {
	templateUrl: 'heavy-rain/heavy-rain.template.html',
	controller: ['neaapi', function HeavyRainController (neaapi) {
    var self = this;
		self.test = "heavy rain warning controller";
    
    neaapi.heavyRain().get(function(data){
      self.data = data;
    });

    self.getTitle = function () {
      if(self.data) {
        return self.data.channel.title;
      }
    }
    
    self.getForecastDate = function() {
      if(self.data) {
        return self.data.channel.item.issue_datentime;
      }
    }
    
    self.getWarning = function() {
      if(self.data) {
        return self.data.channel.item.warning;
        return days;
      }
    }

    self.getRainAreaImage = function () {
      if(self.data) {
        return self.data.channel.rain_area_image.metadata;
      }
    }

    self.getSatelliteImage = function () {
      if(self.data) {
        return self.data.channel.satellite_image.metadata;
      }
    }
	}]
});
