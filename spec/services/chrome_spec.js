describe("$chrome", function() {
  var $chrome;

  beforeEach(inject(["$chrome", function(c) {
    $chrome = c;
  }]));

  it("exists", function() {
    $chrome.should.exist;
  });

  describe("socket", function() {
    it("is an object", function() {
      $chrome.socket.should.exist;
    });

    it("has a 'create' function", function() {
      $chrome.socket.create.should.be.a("function");
    });

    it("has a 'sendTo' function", function() {
      $chrome.socket.sendTo.should.be.a("function");
    });

    it("has a 'read' function", function() {
      $chrome.socket.read.should.be.a("function");
    });

    it("has a 'getNetworkList' function", function() {
      $chrome.socket.getNetworkList.should.be.a("function");
    });

    it("has a 'bind' function", function() {
      $chrome.socket.bind.should.be.a("function");
    });
  });
});
