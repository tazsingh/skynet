describe("controls", function() {
  var controls
    , $window;

  beforeEach(inject([
    "controls"
  , "$window"
  , function(c, w) {
    controls = c;
    $window = w;
  }]));

  it("exists", function() {
    controls.should.exist;
  });

  describe("$window extensions", function() {
    it("has an `onkeyup` function", function() {
      $window.onkeyup.should.be.a("function");
    });

    it("has an `onkeydown` function", function() {
      $window.onkeydown.should.be.a("function");
    });
  });

  describe("states", function() {
    it("is an object", function() {
      controls.states.should.be.an("object");
    });

    it("has certain keys", function() {
      ["verticalSpeed", "angularSpeed", "frontBackTilt", "leftRightTilt"].forEach(function(prop) {
        controls.states.should.have.ownProperty(prop);
      });
    });

    it("has all 0.0 values", function() {
      for(var key in controls.states)
        controls.states[key].should.equal(0.0);
    });

    describe("$window.onkeydown", function() {
      var keyCode = 87
        , keyName = "W";

      it("sets the `keyName` to 1.0 when the `keyCode` is passed", function() {
        $window.onkeydown({
          keyCode: keyCode
        });

        controls.states.frontBackTilt.should.equal(1.0);
      });
    });

    describe("$window.onkeyup", function() {
      var keyCode = 87
        , keyName = "W";

      beforeEach(function() {
        controls.states.frontBackTilt = 1.0;
      });

      it("sets the `keyName` to 0.0 when the `keyCode` is passed", function() {
        $window.onkeyup({
          keyCode: keyCode
        });

        controls.states.frontBackTilt.should.equal(0.0);
      });
    });
  });
});
