describe("Util", function() {
  var Util;

  beforeEach(inject(["Util", function(u) {
    Util = u;
  }]));

  it("exists", function() {
    Util.should.exist;
  });

  describe("stringToArrayBuffer", function() {
    it("is a function", function() {
      Util.stringToArrayBuffer.should.be.a("function");
    });

    it("accepts a string and returns an ArrayBuffer instance", function() {
      Util.stringToArrayBuffer("something").should.be.an.instanceOf(ArrayBuffer);
    });
  });

  describe("float32ToInt32", function() {
    it("is a function", function() {
      Util.float32ToInt32.should.be.a("function");
    });

    it("accepts a float and returns an integer", function() {
      var floatValue = 1.5
        , buffer = new ArrayBuffer(4)
        , view = new DataView(buffer);

      view.setFloat32(0, floatValue, true);

      Util.float32ToInt32(floatValue).should.equal(view.getInt32(0, true));
    });
  });

  describe("uint8ToArrayBuffer", function() {
    it("is a function", function() {
      Util.uint8ToArrayBuffer.should.be.a("function");
    });

    it("accepts an integer and returns an ArrayBuffer instance", function() {
      Util.uint8ToArrayBuffer(4).should.be.an.instanceOf(ArrayBuffer);
    });
  });

  describe("uint8ArrayToString", function() {
    it("is a function", function() {
      Util.uint8ArrayToString.should.be.a("function");
    });

    it("accepts a Uint8Array and returns a string", function() {
      Util.uint8ArrayToString(new Uint8Array(982374)).should.be.a("string");
    });
  });

  describe("uint8ArrayToHex", function() {
    it("is a function", function() {
      Util.uint8ArrayToHex.should.be.a("function");
    });

    it("accepts a Uint8Array and returns a string", function() {
      Util.uint8ArrayToHex(new Uint8Array(8928)).should.be.a("string");
    });
  });
});
