SKYNET.Util = (function() {
  function stringToArrayBuffer(string) {
    var buffer = new ArrayBuffer(string.length)
      , view = new Uint8Array(buffer);

    for(var i = 0; i < string.length; i++) {
      view[i] = string.charCodeAt(i);
    }

    return buffer;
  }

  function float32ToInt32(floatValue) {
    var buffer = new ArrayBuffer(4)
      , view = new DataView(buffer);

    view.setFloat32(0, floatValue, true);

    return view.getInt32(0, true);
  }

  function uint8ToArrayBuffer(intValue) {
    var view = new Uint8Array([intValue]);

    return view.buffer;
  }

  function uint8ArrayToString(uintArrayValue) {
    var string = "";

    for(var i = 0; i < uintArrayValue.length; i++)
      string += String.fromCharCode(uintArrayValue[i]);

    return string;
  }

  function uint8ArrayToHex(uintArrayValue) {
    var string = "";

    for(var i = 0; i < uintArrayValue.length; i++)
      string += uintArrayValue[i].toString(16) + " ";

    return string;
  }

  return {
    stringToArrayBuffer: stringToArrayBuffer
  , float32ToInt32: float32ToInt32
  , uint8ToArrayBuffer: uint8ToArrayBuffer
  , uint8ArrayToString: uint8ArrayToString
  , uint8ArrayToHex: uint8ArrayToHex
  };
})();
