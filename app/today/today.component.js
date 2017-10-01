angular.module('today')
.component('today', {
	templateUrl: 'today/today.template.html',
	controller: ['neaapi', function NowcastController (neaapi) {
    var self = this;
		self.test = "today controller";
    
    neaapi.today().get(function(data){
      self.data = data;
    });

    self.getTitle = function () {
      if(self.data) {
        return self.data.channel.main.title;
      }
    }
    
    self.getForecastDate = function() {
      if(self.data) {
        var json = self.data.channel.main.forecastIssue;
        return json._date + " " + json._time;
      }
    }
    
    self.getValidTime = function() {
      if(self.data) {
        return self.data.channel.main.validTime;
      }
    }
    
    self.getTempLow = function() {
      if(self.data) {
        var temperature = self.data.channel.main.temperature;
        return temperature._low + " " + temperature._unit;
      }
    }
    
    self.getTempHigh = function() {
      if(self.data) {
        var temperature = self.data.channel.main.temperature;
        return temperature._high + " " + temperature._unit;
      }
    }
    
    self.getHumidityLow = function () {
      if(self.data) {
        return self.data.channel.main.relativeHumidity._low;
      }
    }
    
    self.getHumidityHigh = function () {
      if(self.data) {
        return self.data.channel.main.relativeHumidity._high;
      }
    }
    
    self.getWindDirection = function() {
      if(self.data) {
        return self.data.channel.main.wind._direction;
      }
    }
    
    self.getWindSpeed = function() {
      if(self.data) {
        return self.data.channel.main.wind._speed;
      }
    }
    
    self.getMainForecast = function () {
      if(self.data) {
        return self.data.channel.main.wxmain;
      }
    }
    
    self.getMainForecastDescription = function () {
      if(self.data) {
        return self.data.channel.main.forecast;
      }
    }
    
    self.getMainForecastDescription = function () {
      if(self.data) {
        return self.data.channel.main.forecast;
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

	}]
});