skynet.factory("controls", function($window, $rootScope, status, modes) {
  var controls = {
        states: {}
      }
    , mapping = {
        32: "space"
      , 37: "left"
      , 38: "up"
      , 39: "right"
      , 40: "down"
      , 65: "A"
      , 68: "D"
      , 83: "S"
      , 87: "W"
      }
    , movements = {
        "up": ["verticalSpeed", 1.0]
      , "down": ["verticalSpeed", -1.0]
      , "left": ["angularSpeed", -1.0]
      , "right": ["angularSpeed", 1.0]
      , "W": ["frontBackTilt", -1.0]
      , "S": ["frontBackTilt", 1.0]
      , "A": ["leftRightTilt", -1.0]
      , "D": ["leftRightTilt", 1.0]
      };

  for(var key in movements)
    controls.states[movements[key][0]] = 0.0;

  $window.onkeydown = function(event) {
    if(mapping[event.keyCode] === "space") {
      if(status.mode === modes.takeoff)
        status.mode = modes.land;
      else
        status.mode = modes.takeoff;
    }
    else {
      var movement = movements[mapping[event.keyCode]];
      controls.states[movement[0]] = movement[1];
    }
  };

  $window.onkeyup = function(event) {
    if(mapping[event.keyCode] !== "space") {
      var movement = movements[mapping[event.keyCode]];
      controls.states[movement[0]] = 0.0;
    }
  };

  return controls;
});
