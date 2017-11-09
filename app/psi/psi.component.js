angular.module('psi')
.component('psi', {
	templateUrl: 'psi/psi.template.html',
	controller: ['neaapi', function PsiController (neaapi) {
    var self = this;
		self.test = "PSI controller";
    
    self.abbrs = {"NRS" : "National Reporting Stations",
                  "rNO" : "North Region", 
                  "rSO" : "South Region",
                  "rCE" : "Central Region",
                  "rWE" : "West Region",
                  "rEA" : "East Region"};

    self.pollutants = ["NPSI", "NO2_1HR_MAX", "PM10_24HR", "PM25_24HR", "SO2_24HR", "CO_8HR_MAX", "O3_8HR_MAX", "NPSI_CO", "NPSI_O3", "NPSI_PM10", "NPSI_PM25", "NPSI_SO2"];

    self.psi_bands = [{"threshold": 50, "descriptor": "Good"},
                  {"threshold": 100, "descriptor": "Moderate"},
                  {"threshold": 200, "descriptor": "Unhealthy"},
                  {"threshold": 300, "descriptor": "Very unhealthy"},
                  {"threshold": 10000, "descriptor": "Hazardous"}];

    neaapi.psi().get(function(data){
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

    self.getPollutantReading = function (arr, pollutant) {
      for(var i=0; i<arr.length; i++) {
        var item = arr[i];
        if(item._type == pollutant) {
          return item._value;
        }
      }
      return "nothinghere...";
    }

  self.getPSIDescriptor = function (psi) {
      if(self.data) {
        for(var i=0; i<self.psi_bands.length; i++) {
          var current_band = self.psi_bands[i];
          if(psi <= current_band.threshold) {
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
