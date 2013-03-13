skynet.factory("Util", function() {
  var Util = {};

  Util.stringToArrayBuffer = function(string) {
    var buffer = new ArrayBuffer(string.length)
      , view = new Uint8Array(buffer);

    for(var i = 0; i < string.length; i++) {
      view[i] = string.charCodeAt(i);
    }

    return buffer;
  }

  Util.float32ToInt32 = function(floatValue) {
    var buffer = new ArrayBuffer(4)
      , view = new DataView(buffer);

    view.setFloat32(0, floatValue, true);

    return view.getInt32(0, true);
  }

  Util.uint8ToArrayBuffer = function(intValue) {
    var view = new Uint8Array([intValue]);

    return view.buffer;
  }

  Util.uint8ArrayToString = function(uintArrayValue) {
    var string = "";

    for(var i = 0; i < uintArrayValue.length; i++)
      string += String.fromCharCode(uintArrayValue[i]);

    return string;
  }

  Util.uint8ArrayToHex = function(uintArrayValue) {
    var string = "";

    for(var i = 0; i < uintArrayValue.length; i++)
      string += uintArrayValue[i].toString(16) + " ";

    return string;
  }

  return Util;
});
