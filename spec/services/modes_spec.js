describe("modes", function() {
  var modes;

  beforeEach(inject(["modes", function(m) {
    modes = m;
  }]));

  it("exists", function() {
    modes.should.exist;
  });

  describe("land", function() {
    it("is 290717696", function() {
      modes.land.should.equal(290717696);
    });
  });

  describe("takeoff", function() {
    it("is 290718208", function() {
      modes.takeoff.should.equal(290718208);
    });
  });
});
