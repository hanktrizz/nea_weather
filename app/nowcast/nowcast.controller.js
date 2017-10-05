angular.module('nowcast')

.controller('NowcastController', ['neaapi', function(neaapi){
  var self = this;
    self.test = "nowcast controller";

    neaapi.nowcast().get(function(data){
      self.data = data;
    });

    self.getTitle = function () {
      if(self.data) {
        return self.data.channel.title;
      }
    }
    
    self.getForecastDate = function() {
      if(self.data) {
        var json = self.data.channel.item.forecastIssue;
        return json._date + " " + json._time;
      }
    }
    
    self.getValidTime = function() {
      if(self.data) {
        return self.data.channel.item.validTime;
      }
    }
    
    self.getWeatherForecast = function() {
      if(self.data) {
        return self.data.channel.item.weatherForecast.area;
      }
    };
}]);
