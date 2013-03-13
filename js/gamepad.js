SKYNET.Gamepad = (function() {
  var buttons = {}
    , axes = {
        left: {}
      , right: {}
      };

  function getButton(name) {
    return buttons[name];
  };

  function getAxis(name, orientation) {
    return axes[name][orientation];
  };

  function updateButton(name, value) {
    if(buttons[name] !== value)
      buttons[name] = value;
  };

  function updateAxis(name, orientation, value) {
    if(axes[name][orientation] !== Math.round(value * 100) / 100)
      axes[name][orientation] = Math.round(value * 100) / 100;
  };

  return {
    getButton: getButton
  , getAxis: getAxis
  , updateButton: updateButton
  , updateAxis: updateAxis
  };
})();
