skynet.factory("client", function($chrome) {
  var client = {};

  client.ip = null;

  client.getNetworkList = function(callback) {
    $chrome.socket.getNetworkList(function(entries) {
      var results = [];

      if(entries)
        for(var i = 0, entry = entries[i]; i < entries.length; i++, entry = entries[i]) {
          if(entry && entry.address && entry.address.indexOf && entry.address.indexOf("192.168.1.") === 0) {
            results.push(entry.address);
          }
        }

      callback(results);
    });
  };

  //client.getNetworkList(function(results) {
  //  if(results.length) {
  //    client.ip = results[0];
  //    console.log("client ip is", client.ip);
  //  }
  //  //else
  //    // error
  //});

  return client;
});
