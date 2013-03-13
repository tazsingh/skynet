describe("Command", function() {
  var Command
    , command;

  beforeEach(inject(["Command", function(c) {
    Command = c;
    command = new Command("hello", ["world"]);
  }]));

  it("is a function", function() {
    Command.should.be.a("function");
  });

  describe("create", function() {
    it("creates a new Command", function() {
      command.create("hello", ["world"]).should.be.an.instanceOf(Command);
    });
  });

  describe("toString", function() {
    it("returns a string", function() {
      command.toString().should.be.a("string");
    });
  });
});
