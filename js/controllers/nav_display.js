skynet.controller("NavDisplay", function(
  navData
, $scope
) {
  $scope.battery = function() {
    if(navData.data.batteryPercentage != undefined)
      return navData.data.batteryPercentage + "%"
    else
      return "?"
  }
  $scope.state = function() {
    state = null;

    return navData.data.controlState;
  }

  $scope.altitude = function() {
    return (Math.floor(navData.data.altitude / 10) / 100) + "m" ;
  }
});
