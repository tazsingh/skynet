SKYNET.API = (function() {
  var DRONE_IP = "192.168.1.1"
    , CLIENT_IP
    , sockets = {
        "nav": {
          protocol: "udp"
        , port: 5554
        , socketID: null
        , type: 'bind'
        , toDrone: false
        }
      , "vid": {
          protocol: "tcp"
        , port: 5555
        , socketID: null
        , type: 'connect'
        , toDrone: true
        }
      , "at": {
          protocol: "udp"
        , port: 5556
        , socketID: null
        , type: 'bind'
        , toDrone: false
        }
      , "cmd": {
          protocol: "udp"
        , port: 5559
        , socketID: null
        , type: 'connect'
        , toDrone: true
        }
      }
    , outstandingSockets = Object.keys(sockets).length
    , keepAliveTimeout = 0
    , modes = {
        land: 290717696
      , takeoff: 290718208
      }
    , status = {
        verticalSpeed: 0
      , angularSpeed: 0
      , leftRightTilt: 0
      , frontBackTilt: 0
      , enabled: false
      , mode: modes["land"]
      }
    , takeOffLandStart
    , previousTakeOffStatus
    , videoElement = document.querySelector("video")
    , mediaSource
    , sourceBuffer
    , sourceBufferType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
    , firstChunkAppended = false;

  window.sockets = sockets;
  window.videoElement = videoElement;

  function noop() {};

  function getClientIP(callback) {
    chrome.socket.getNetworkList(function(entries) {
      if (entries)
        for (var i = 0; i<entries.length; i++) {
          if (entries[i] && entries[i].address && entries[i].address.indexOf("192.168.1.") == 0) {
            callback(entries[i].address);
          }
        }
    });
  };

  function init() {
    mediaSource = new WebKitMediaSource();
    window.mediaSource = mediaSource;
    videoElement.src = window.URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("webkitsourceopen", function() {
      sourceBuffer = mediaSource.addSourceBuffer(sourceBufferType);

      getClientIP(function(clientIP) {
        CLIENT_IP = clientIP;

        console.log("Client IP changed to ", CLIENT_IP);

        for(socket in sockets)
          connect(sockets[socket]);
      });
    });
  };

  function connect(socket) {
    chrome.socket.create(socket.protocol, undefined, function(sockInfo) {
      socket.socketID = sockInfo.socketId;

      chrome.socket[socket.type](
        socket.socketID
      , socket.toDrone ? DRONE_IP : CLIENT_IP
      , socket.port
      , connectedCallback
      );
    });
  };

  function connectedCallback(result) {
    if(result >= 0) {
      outstandingSockets--;

      // all sockets have connected
      if(outstandingSockets === 0) {
        sendKeepAliveCommand();
        //sendFlatTrim();
        sendSensitivity();

        sendOutdoor(false);

        status.enabled = true;

        //takeOffOrLand();
        loop();
      }
    }
    else {
      // handle error
      console.log("SOCKET ERROR");
    }
  };

  function sendCommands(commands) {
    if(keepAliveTimeout)
      clearTimeout(keepAliveTimeout);

    var atSocket = sockets["at"]
      , commandBuffer = SKYNET.Util.stringToArrayBuffer(commands.join(""));

    //console.log(commands.join(""));

    chrome.socket.sendTo(
      atSocket.socketID
    , commandBuffer
    , DRONE_IP
    , atSocket.port
    , noop
    );

    keepAliveTimeout = setTimeout(sendKeepAliveCommand, 1000);
  };

  function sendKeepAliveCommand() {
    var navSocket = sockets["nav"];

    chrome.socket.sendTo(
      navSocket.socketID
    , (new Uint8Array([1]).buffer)
    , DRONE_IP
    , navSocket.port
    , noop
    );

    chrome.socket.read(
      navSocket.socketID
    , function(data) {
      if(data.data.byteLength > 0) {
        window.data = data.data;
        console.log("navdata", SKYNET.NavData.parse(data.data));
      }
    });
  };

  function sendFlatTrim() {
    sendCommands([new SKYNET.Command("FTRIM")]);
  };

  function sendSensitivity() {
    var sensitivity = "0.11";

    sendCommands([
      new SKYNET.Command("CONFIG", ['"control:euler_angle_max"', '"' + sensitivity + '"'])
    , new SKYNET.Command("CONFIG", ['"control:indoor_euler_angle_max"', '"' + sensitivity + '"'])
    , new SKYNET.Command("CONFIG", ['"control:outdoor_euler_angle_max"', '"' + sensitivity + '"'])
    ]);
  };

  function sendOutdoor(isOutdoor) {
    sendCommands([
      new SKYNET.Command("CONFIG", ['"control:outdoor"', '"' + (isOutdoor ? "TRUE" : "FALSE") + '"'])
    ]);
  };

  function takeOffOrLand() {
    if(!takeOffLandStart || previousTakeOffStatus != status.mode) {
      takeOffLandStart = Date.now();
      previousTakeOffStatus = status.mode;
    }
    else {
      if(takeOffLandStart + 1000 < Date.now()) {
        takeOffLandStart = 0;
        loop();

        setTimeout(land, 1000);

        return;
      }
    }

    sendCommands([
      new SKYNET.Command(
        "REF", [
          status.mode
        ]
      )
    ]);

    setTimeout(takeOffOrLand, 60);
  };

  function loop() {
    //if(previousTakeOffStatus !== status.mode) {
    //  takeOffOrLand();

    //  return;
    //}

    sendCommands([
      new SKYNET.Command("REF", [
        status.mode
      ])
    , new SKYNET.Command("PCMD", [
        (status.enabled ? 1 : 0)
      , SKYNET.Util.float32ToInt32(status.leftRightTilt)
      , SKYNET.Util.float32ToInt32(status.frontBackTilt)
      , SKYNET.Util.float32ToInt32(status.verticalSpeed)
      , SKYNET.Util.float32ToInt32(status.angularSpeed)
      ])
    ]);

    status.verticalSpeed = 0;
    status.angularSpeed = 0;
    status.leftRightTilt = 0;
    status.frontBackTilt = 0;

    //if(!firstChunkAppended) {
    //  chrome.socket.read(
    //    sockets.vid.socketID
    //  , function(data) {
    //      //mediaSource.addSourceBuffer(sourceBufferType).append(new Uint8Array(data.data));
    //      sourceBuffer.append(new Uint8Array(data.data));
    //      //videoElement.webkitSourceAppend(data.data);

    //      videoElement.play();

    //      console.log("playing video");

    //      firstChunkAppended = true;
    //    }
    //  );
    //}

    setTimeout(loop, 60);
  };

  function takeOff() {
    status.mode = modes.takeoff;
  };

  function land() {
    status.mode = modes.land;
  };

  function shutdown() {
    console.log("shutdown!");
  };

  window.onkeypress = function(event) {
    console.log(event);

    switch(event.keyCode) {
      case 119: // W
        status.frontBackTilt = 0.5;
        break;
      case 97:  // A
        status.leftRightTilt = -0.5;
        break;
      case 115: // S
        status.frontBackTilt = -0.5;
        break;
      case 100: // D
        status.leftRightTilt = 0.5;
        break;

      case 38: // up arrow
        status.verticalSpeed = 0.1;
        break;
      case 37: // left arrow
        status.angularSpeed = -0.5;
        break;
      case 40: // down arrow
        status.verticalSpeed = -0.1;
        break;
      case 39: // right arrow
        status.angularSpeed = 0.5;
        break;

      case 32: // spacebar
        if(status.mode === modes.takeoff)
          status.mode = modes.land;
        else
          status.mode = modes.takeoff;

        break;
    };
  };

  return {
    init: init
  , shutdown: shutdown
  , takeOff: takeOff
  , land: land
  };
})();
