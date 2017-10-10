angular.module('fourDays')
.component('fourDays', {
	templateUrl: 'four-days/four-days.template.html',
	controller: ['neaapi', function TodayController (neaapi) {
    var self = this;
		self.test = "four days controller";
    
    neaapi.fourDays().get(function(data){
      self.data = data;
    });

    self.getTitle = function () {
      if(self.data) {
        return self.data.channel.item.title;
      }
    }
    
    self.getForecastDate = function() {
      if(self.data) {
        var json = self.data.channel.item.forecastIssue;
        return json._date + " " + json._time;
      }
    }
    
    self.getDays = function() {
      if(self.data) {
        var days = self.data.channel.item.weatherForecast.day;
        return days;
      }
    }
    
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
