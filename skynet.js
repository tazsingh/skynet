chrome.app.runtime.onLaunched.addListener(function() {
  var isAliveCheck = 0
    , appWindow = null;

  isAliveCheck = setInterval(function() {
      if(appWindow && appWindow.closed && appWindow.SKYNET) {
        appWindow.SKYNET.API.shutdown();
        appWindow = null;

        if (isAliveCheck)
          clearInterval(isAliveCheck);
      }
    }
  , 1000);

  chrome.app.window.create("index.html", {
      width: 1024
    , height: 768
    }
  , function(createdWindow) {
    appWindow = createdWindow.dom;
  });
});
