/**
 * Directives that are not view-specific
 */
angular
    .module('core.neaapi')
    .directive('theDateNow', ['$filter', function ($filter) {
        return function (scope, element, attrs) {
            var dateFormat = 'EEEE, MMM d';
            element.html($filter('date')(new Date(), dateFormat));
        }
    }])
    .directive('activeMenu', ['currentActive', function (currentActive) {
        var menuElements = [];
        var firstTime = true;

        function setActive(element, menuId) { //nested function that adds the css class
            if (currentActive.getActiveMenuId() === menuId) {
                element.addClass('active');
                element.removeClass('inactive')
            }
            else {
                element.removeClass('active');
                element.addClass('inactive');
            }
        }

        return function (scope, element, attrs) {
            var menuId = attrs["activeMenu"];
            menuElements.push({id: menuId, node: element});

            if (firstTime) {
                scope.$watch(currentActive.getActiveMenuId, function (newValue, oldValue) {
                    for (var i = 0; i < menuElements.length; i++) {
                        var menuElement = menuElements[i];
                        setActive(menuElement.node, menuElement.id);
                    }
                });
                firstTime = false;
            }
        }
    }])
    .directive('activeViewItem', ['currentActive', function (currentActive) {
        return function (scope, element, attrs) {
            currentActive.setActiveMenuId(attrs["activeViewItem"]);
            console.log("link function 1 executing" + " active menu is: " + currentActive.getActiveMenuId()); //tracing link fn
        }
    }])
    .directive('hourlyIcon', ['timeUtils', function (timeUtils) {
        var hourMap = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var baseHtml = "<i id=\"icoClock\" class=\"wi wi-time-" + hourMap[timeUtils.getHour()] + "\"></i>";
        return function (scope, element, attrs) {
            console.log('testing link fn ' + baseHtml);
            element.html(baseHtml);
        }
    }])
    .directive('assignWeatherIcon', ['neaapi', function (neaapi) {
        var groupedWeatherPatterns = [
            "BR,FG,HZ,LH",                  //mist, haze kind
            "HG,HT,TL",                     //thundery rains
            "HR,HS,DR,LR,LS,RA,PS,SH",      //showery rains
            "FA,FN,FW",                     //generally fair
            "CL,OC",                        //cloudy
            "PC,PN",                        //partly cloudy
            "SK,SR,WR,WS",                  //windy rain
            "SN,SS",                        //snowy type weather - who are we kidding
            "SU",                           //sunny
            "SW,WF,WC,WF"                   //windy
        ];

        var iconMatrix = [
            "wi-smog",
            "wi-thunderstorm",
            "wi-rain",
            "wi-day-sunny-overcast",
            "wi-cloudy",
            "wi-cloud",
            "wi-rain-wind",
            "wi-snow",
            "wi-day-sunny",
            "wi-strong-wind"
        ];
        var prependHtml = "<i class=\"weatherIconsOnly wi ";
        var appendHtml = "\"></i>";

        return ({
            link: function (scope, element, attrs) {
                neaapi.today().get(function (data) {
                    scope.data = data;  //may not really be necessary to bind to scope
                    console.log(scope.data.channel.main.forecast);
                    console.log(scope.data.channel.main.wxmain);
                    var index = -1;
                    for (var i = 0; i < groupedWeatherPatterns.length; i++) {
                        if (groupedWeatherPatterns[i].indexOf(scope.data.channel.main.wxmain) > -1) {
                            index = i;
                            break;
                        }
                    }
                    if (i != -1)
                        element.html(prependHtml + iconMatrix[i] + appendHtml);
                });
            },
            restrict: "A"
        });
    }]);

