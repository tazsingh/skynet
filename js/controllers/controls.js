skynet.controller("Controls", function(
  $chrome
, status
, modes
, sockets
, client
, DRONE_IP
, Util
, Command
, controls
, gamepadDevice
, navData
, $scope) {

  var outstandingSockets = Object.keys(sockets).length;
  var debug = false;

  if(client.ip)
    initialize();
  else
    client.getNetworkList(function(results) {
      if(results.length) {
        client.ip = results[0];
        console.log("client ip is", client.ip);

        initialize();
      }
      else
        console.log("getNetworkList error");
    });

  function initialize() {
    for(socket in sockets)
      connect(sockets[socket]);
  }

  function connect(socket) {
    $chrome.socket.create(socket.protocol, undefined, function(socketInfo) {
      socket.socketID = socketInfo.socketId;

      $chrome.socket[socket.type](
        socket.socketID
      , (socket.toDrone ? DRONE_IP : client.ip)
      , socket.port
      , connectedCallback
      );
    });
  }

  function connectedCallback(result) {
    if(result >= 0) {
      outstandingSockets--;

      if(outstandingSockets === 0) {
        console.log("connected");

        sendKeepAliveCommand();
        sendFlatTrim();
        sendSensitivity();

        sendOutdoor(false);
        sendAllNavdata();

        status.enabled = true;

        loop();
      }
    }
    else
      console.error("SOCKET ERROR");
  }

  function noop() {}

  function sendKeepAliveCommand() {
    var navSocket = sockets["navigation"];
    var prevState = null;

    $chrome.socket.sendTo(
      navSocket.socketID
    , (new Uint8Array([1]).buffer)
    , DRONE_IP
    , navSocket.port
    , noop
    );

    $chrome.socket.read(
      navSocket.socketID
    , function(data) {
        if(data.data.byteLength > 0) {
          navData.parseData(data.data);
          if(debug && prevState != navData.data.controlState) {
            console.log(navData.data);
            prevState = navData.data.controlState;
          }
        }
      }
    );
  }

  function sendCommands(commands) {

    var atSocket = sockets["at"]
      , commandBuffer = Util.stringToArrayBuffer(commands.join(""));

    $chrome.socket.sendTo(
      atSocket.socketID
    , commandBuffer
    , DRONE_IP
    , atSocket.port
    , noop
    );
  }

  function sendFlatTrim() {
    sendCommands([new Command("FTRIM")]);
  }

  function sendSensitivity() {
    var sensitivity = "0.11";

    sendCommands([
      new Command("CONFIG", [
        '"control:euler_angle_max"'
      , '"' + sensitivity + '"'
      ])
    , new Command("CONFIG", [
        '"control:indoor_euler_angle_max"'
      , '"' + sensitivity + '"'
      ])
    , new Command("CONFIG", [
        '"control:outdoor_euler_angle_max"'
      , '"' + sensitivity + '"'
      ])
    ]);
  }

  function sendOutdoor(isOutdoor) {
    sendCommands([
      new Command("CONFIG", [
        '"control:outdoor"'
      , '"' + (isOutdoor ? "TRUE" : "FALSE") + '"'
      ])
    ]);
  }

  function sendAllNavdata() {
    sendCommands([
      new Command("CONFIG", [
        '"general:navdata_demo"'
      , '"FALSE"'])
    ]);
  }

  function takeOffOrLand() {
    if(!takeOffLandStart || previousTakeOffStatus !== status.mode) {
      takeOffLandStart = Date.now();
      previousTakeOffStatus = status.mode;
    }
    else if(takeOffLandStart + 1000 < Date.now()) {
      takeOffLandStart = 0;
      loop();

      setTimeout(land, 1000);

      return;
    }

    sendCommands([
      new Command(
        "REF"
      , [
          status.mode
        ]
      )
    ]);

    setTimeout(takeOffOrLand, 60);
  }

  function loop() {
    sendCommands([
      new Command("REF", [
        status.mode
      ])
    , new Command("PCMD", [
        (status.enabled ? 1 : 0)
      , Util.float32ToInt32(controls.states.leftRightTilt)
      , Util.float32ToInt32(controls.states.frontBackTilt)
      , Util.float32ToInt32(controls.states.verticalSpeed)
      , Util.float32ToInt32(controls.states.angularSpeed)
      ])
    ]);

    sendKeepAliveCommand();

    setTimeout(loop, 60);
  }

  $scope.controls = [
    "UP"
  , "DOWN"
  , "LEFT"
  , "RIGHT"
  ];

  $scope.controlClasses = function(control) {
    if(control === "UP")
      return "span2 btn btn-round btn-active"
    else
      return "span2 btn btn-round"
  }

  //controls.
});
