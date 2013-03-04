SKYNET.NavData = (function() {
  function parse(data) {
    var view = new DataView(data)
      , start = 16
      , options
      , optionID
      , optionSize;

    if(start + 36 <= data.byteLength) {
      optionID = view.getInt16(start, true);
      optionSize = view.getInt16(start + 2, true);

      options = {
        controlState: view.getUint32(start + 4, true)
      , batteryPercentage: view.getUint32(start + 8, true)
      , theta: view.getFloat32(start + 12, true)
      , phi: view.getFloat32(start + 16, true)
      , pai: view.getFloat32(start + 20, true)
      , altitude: view.getInt32(start + 24, true)
      , vx: view.getFloat32(start + 28, true)
      , vy: view.getFloat32(start + 32, true)
      , vz: view.getFloat32(start + 36, true)
      };
    };

    return {
      options: options
    };
  };

  return {
    parse: parse
  };
})();
