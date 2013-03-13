describe("DRONE_IP", function() {
  var DRONE_IP;

  beforeEach(inject(["DRONE_IP", function(d) {
    DRONE_IP = d;
  }]));

  it("is 192.168.1.1", function() {
    DRONE_IP.should.equal("192.168.1.1");
  });
});
