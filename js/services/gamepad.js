skynet.factory("gamepadDevice", function(
    $window
  , $rootScope
  , controls
  , status
  , modes
  ) {

  var movements = {
    mode: false
  };

  var gamepadDevice = {
      gamepad: null
    , prevTimestamp: null
    , prevRawGamepadType: null
    , ticking: false
    , init: function() {
        var gamepadSupportAvailable;
        gamepadSupportAvailable = !!navigator.webkitGetGamepads;
        if (gamepadSupportAvailable) {
          gamepadDevice.startPolling();
        }
      }
    , startPolling: function() {
        if (!gamepadDevice.ticking) {
          gamepadDevice.ticking = true;
          gamepadDevice.tick();
        }
      }
    , tick: function() {
        gamepadDevice.pollStatus();
        gamepadDevice.scheduleNextTick();
      }
    , pollStatus: function() {
        gamepadDevice.pollGamepads();

        if (gamepadDevice.gamePad) {
          gamepadDevice.prevTimestamp = gamepadDevice.timestamp;
          gamepadDevice.sendControllerStatus();
        }
      }
    , pollGamepads: function() {
        var gamepadsChanged
          , rawGamepads = navigator.webkitGetGamepads();

        if (rawGamepads) {
          gamepadsChanged = false;

          if (gamepadDevice.prevRawGamepadType !== typeof rawGamepads[0]) {
            gamepadsChanged = true;
            gamepadDevice.prevRawGamepadType = typeof rawGamepads[0];
          }

          if (gamepadsChanged) {
            console.log("gamepad set", rawGamepads[0]);

            gamepadDevice.gamePad = rawGamepads[0];
          }
        }
      }
    , sendControllerStatus: function() {
        var gamePad = gamepadDevice.gamePad;

        for(var i = 0, button = gamePad.buttons[i]; i < gamePad.buttons.length; i++, button = gamePad.buttons[i]) {
          if(i == 0 && button == 1)
            movements["mode"] = true;
          // skynet.Gamepad.updateButton(i, button);
        }

        for(var i = 0
            , axisName = "left"
            , orientation = "x"
            , axis = gamePad.axes[i]
          ; i < gamePad.axes.length
          ; i++
            , axisName = Math.floor(i / 2) === 0 ? "left" : "right"
            , orientation = i % 2 ? "x" : "y"
            , axis = gamePad.axes[i]) {
          // console.log("Aix: ", axisName, orientation, axis)
          // skynet.Gamepad.updateAxis(axisName, orientation, axis);
        }

        if(movements["mode"] == true) {
          movements["mode"] = false;
          if(status.mode === modes.takeoff) {
            console.log("fired land")
            status.mode = modes.land;
          }
          else {
            console.log("fired takeoff")
            status.mode = modes.takeoff;
          }
        }


      }
    , scheduleNextTick: function() {
        if (gamepadDevice.ticking) {
          setTimeout(function() {
            gamepadDevice.tick()}
          , 100);
        }
      }
  }

  gamepadDevice.init();

  return gamepadDevice;
});
