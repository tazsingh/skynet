skynet.factory("controls", function($window) {
  var controls = {
        states: {}
      }
    , mapping = {
        32: "space"
      , 37: "left"
      , 38: "up"
      , 39: "right"
      , 40: "down"
      , 97: "A"
      , 100: "D"
      , 115: "S"
      , 119: "W"
      }

  for(var key in mapping)
    controls.states[mapping[key]] = 0.0;

  $window.onkeydown = function(event) {
    controls.states[mapping[event.keyCode]] = 1.0;
  };

  $window.onkeyup = function(event) {
    controls.states[mapping[event.keyCode]] = 0.0;
  };

  return controls;
});
