describe("client", function() {
  var client
    , $chrome;

  beforeEach(inject(["client", "$chrome", function(c, chrome) {
    client = c;
    $chrome = chrome;
  }]));

  it("exists", function() {
    client.should.exist;
  });

  describe("ip", function() {
    it("is null", function() {
      should.equal(null, client.ip);
    });
  });

  describe("getNetworkList", function() {
    it("is a function", function() {
      client.getNetworkList.should.be.a("function");
    });

    it("calls $chrome.socket.getNetworkList", function() {
      client.getNetworkList();

      $chrome.socket.getNetworkList.should.have.been.called;
    });

    it("calls a callback", function() {
      var callback = sinon.spy();

      client.getNetworkList(callback);

      $chrome.socket.getNetworkList.yield();

      callback.should.have.been.called;
    });

    it("returns local IPs to the callback", function(done) {
      client.getNetworkList(function(results) {
        results.sort().should.eql(["192.168.1.10", "192.168.1.4"]);

        done();
      });

      $chrome.socket.getNetworkList.yield([{
          address: "192.168.1.4"
        }
      , {
          address: "185.948.0.1"
        }
      , {
          address: "some string"
        }
      , {
          address: 12345
        }
      , {
          not_an_address: true
        }
      , {
          address: "192.168.1.10"
        }
      , 4]);
    });
  });
});
