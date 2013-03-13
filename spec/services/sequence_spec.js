describe("Sequence", function() {
  var Sequence;

  beforeEach(inject(["Sequence", function(s) {
    Sequence = s;
  }]));

  it("exists", function() {
    Sequence.should.exist;
  });

  describe("next", function() {
    it("is a function", function() {
      Sequence.next.should.be.a("function");
    });

    it("returns a number", function() {
      Sequence.next().should.be.a("number");
    });

    it("returns consecutive numbers", function() {
      var original = Sequence.next();

      for(var i = 0; i < 10; i++)
        Sequence.next().should.equal(++original);
    });
  });

  describe("reset", function() {
    it("is a function", function() {
      Sequence.reset.should.be.a("function");
    });

    it("resets the next() number", function() {
      Sequence.next();

      var nextNumber = Sequence.next();

      Sequence.reset();

      Sequence.next().should.be.below(nextNumber);
    });
  });
});
