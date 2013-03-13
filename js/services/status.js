skynet.factory("status", function(modes) {
  return {
    verticalSpeed: 0
  , angularSpeed: 0
  , leftRightTilt: 0
  , frontBackTilt: 0
  , enabled: false
  , mode: modes.land
  }
});
