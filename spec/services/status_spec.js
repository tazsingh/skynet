describe("status", function() {
  var status
    , modes;

  beforeEach(inject(["status", "modes", function(s, m) {
    status = s;
    modes = m;
  }]));

  it("exists", function() {
    status.should.exist;
  });

  describe("verticalSpeed", function() {
    it("is 0", function() {
      status.verticalSpeed.should.equal(0);
    });
  });

  describe("angularSpeed", function() {
    it("is 0", function() {
      status.angularSpeed.should.equal(0);
    });
  });

  describe("leftRightTilt", function() {
    it("is 0", function() {
      status.leftRightTilt.should.equal(0);
    });
  });

  describe("frontBackTilt", function() {
    it("is 0", function() {
      status.frontBackTilt.should.equal(0);
    });
  });

  describe("enabled", function() {
    it("is false", function() {
      status.enabled.should.equal(false);
    });
  });

  describe("mode", function() {
    it("is modes.land", function() {
      status.mode.should.equal(modes.land);
    });
  });
});
