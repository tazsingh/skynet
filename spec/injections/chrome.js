skynet.factory("$chrome", function() {
  return {
    socket: {
      create: sinon.spy()
    , sendTo: sinon.spy()
    , getNetworkList: sinon.spy()
    , read: sinon.spy()
    , bind: sinon.spy()
    }
  };
});
