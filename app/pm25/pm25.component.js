angular.module('pm25')
.component('pm25', {
	templateUrl: 'pm25/pm25.template.html',
	controller: ['neaapi', function Pm25Controller (neaapi) {
    var self = this;
		self.test = "PM 25 controller";
    
    self.abbrs = {"rNO" : "North Region", 
                  "rSO" : "South Region",
                  "rCE" : "Central Region",
                  "rWE" : "West Region",
                  "rEA" : "East Region"};

    self.bands = [{"threshold": 55, "descriptor": "Normal", "band": 1},
                  {"threshold": 150, "descriptor": "Elevated", "band": 2},
                  {"threshold": 250, "descriptor": "High", "band": 3},
                  {"threshold": 10000, "descriptor": "Very High", "band": 4}];
    
    neaapi.pm25().get(function(data){
      self.data = data;
      console.log(self.data);
    });

    self.getTitle = function () {
      if(self.data) {
        return self.data.channel.title;
      }
    }

    self.getSource = function() {
      if(self.data) {
        return self.data.channel.source;
      }
    }
    
    self.getRegions = function() {
      if(self.data) {
        return self.data.channel.item.region;
      }
    }

    self.getBand = function (pm25) {
      if(self.data) {
        for(var i=0; i<self.bands.length; i++) {
          var current_band = self.bands[i];
          if(pm25 <= current_band.threshold) {
            return current_band.band;
          }
        }
      }
      return 0;
    }

    self.getDescriptor = function (pm25) {
      if(self.data) {
        for(var i=0; i<self.bands.length; i++) {
          var current_band = self.bands[i];
          if(pm25 <= current_band.threshold) {
            return current_band.descriptor;
          }
        }
      }
      return "";
    }

    self.getDate = function(str) {
      var s = str.slice(0,4) + "-" + str.slice(4,6) + "-" + str.slice(6,8) + "T" + str.slice(8,10) + ":" + str.slice(10,12) + ":" + str.slice(12,14);
      console.log(str + " ---> " + s);
      return new Date(s);
    }
/*
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
    */
	}]
});