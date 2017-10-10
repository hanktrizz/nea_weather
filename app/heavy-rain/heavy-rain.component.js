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
    /*
    self.getForecastDescriptions = function() { 
      if(self.data) {
        var forecastDescriptions = self.data.channel.item.weatherForecast.forecast;
        return forecastDescriptions;
      }
    }
    
    self.getForecasts = function () {
      if(self.data) {
        var forecasts = self.data.channel.item.weatherForecast.icon;
        return forecasts;
      }
    }
    
    self.getTemperatures = function () {
      if(self.data) {
        var temperatures = self.data.channel.item.weatherForecast.temperature;
        return temperatures.map(function(item) {
          return item._low + " - " + item._high;
        });
      }
    }
    
    self.getRelativeHumidities = function() {
      if(self.data) {
        var humidity = self.data.channel.item.weatherForecast.relativeHumidity;
        return humidity.map(function(item) {
          return item._low + " - " + item._high;
        });
      }
    }
    
    self.getWindInformation = function() {
      if(self.data) {
        var wind = self.data.channel.item.weatherForecast.wind;
        return wind.map(function(item) {
          return "Direction: " + item._direction + ", Speed: " + item._speed;
        });
      }
    }
    
    /*
    self.getMainForecast = function () {
      if(self.data) {
        return self.data.channel.item.wxmain;
      }
    }
    
    self.getMainForecastDescription = function () {
      if(self.data) {
        return self.data.channel.item.forecast;
      }
    }
    
    self.getMainForecastDescription = function () {
      if(self.data) {
        return self.data.channel.item.forecast;
      }
    }

    self.getForecastTimePeriodArea = function() {
      if(self.data) {
        var keys = Object.keys(self.data.channel);
        var timePeriods = keys.slice(3);
        var array = [];
        for(timePeriod of timePeriods) {
          var obj = self.data.channel[timePeriod];
          obj['time_of_day'] = timePeriod;
          array.push(obj);
        };
        return array;
      }
    }
    */

	}]
});
