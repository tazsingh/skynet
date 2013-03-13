var gamepadController = {
  /*
  From HTML5Rocks
  Even if you connect the gamepad, it won't manifest itself in any way unless the user
  presses any of its buttons first. This is to prevent fingerprinting, although proves to be
  a bit of a challenge for user experience: you can't ask the user to press the button or
  provide gamepad-specific instructions because you have no idea whether they connected
  their controller.

  Chrome's implementation of the API exposes a function – navigator.webkitGetGamepads() –
  you can use to get a list of all the gamepads currently plugged into to the system,
  alongside with their current state (buttons + sticks). The first connected gamepad will
  be returned as the first entry in the array, and so on.

  The so-far-implemented part of the spec requires you to continuously check the state of
  connected gamepads (and compare it to the previous one if necessary), instead of firing
  events when things change.
  */

  gamepad: null
, prevTimestamp: null
, prevRawGamepadType: null
, ticking: false
, init: function() {
    var gamepadSupportAvailable;
    gamepadSupportAvailable = !!navigator.webkitGetGamepads;
    if (gamepadSupportAvailable) {
      gamepadController.startPolling();
    }
  }
, startPolling: function() {
    if (!gamepadController.ticking) {
      gamepadController.ticking = true;
      gamepadController.tick();
    }
  }
, tick: function() {
    gamepadController.pollStatus();
    gamepadController.scheduleNextTick();
  }
, pollStatus: function() {
    gamepadController.pollGamepads();

    if (gamepadController.gamePad) {
      gamepadController.prevTimestamp = gamepadController.timestamp;
      gamepadController.updateDisplay();
    }
  }
, pollGamepads: function() {
    var gamepadsChanged
      , rawGamepads = navigator.webkitGetGamepads();

    if (rawGamepads) {
      gamepadsChanged = false;

      if (gamepadController.prevRawGamepadType !== typeof rawGamepads[0]) {
        gamepadsChanged = true;
        gamepadController.prevRawGamepadType = typeof rawGamepads[0];
      }

      if (gamepadsChanged) {
        console.log("gamepad set", rawGamepads[0]);
        gamepadController.gamePad = rawGamepads[0];
      }
    }
  }
, updateDisplay: function() {
    var gamePad = gamepadController.gamePad;

    for(var i = 0, button = gamePad.buttons[i]; i < gamePad.buttons.length; i++, button = gamePad.buttons[i]) {
      SKYNET.Gamepad.updateButton(i, button);
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

      SKYNET.Gamepad.updateAxis(axisName, orientation, axis);
    }
  }
, scheduleNextTick: function() {
    if (gamepadController.ticking) {
      window.requestAnimationFrame(function() {
        gamepadController.tick();
      });
    }
  }
};

gamepadController.init();
