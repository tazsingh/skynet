skynet.factory("Command", function(Sequence) {
  function Command(command, parts) {
    this.command = command;
    this.parts = parts || [];
  };

  Command.prototype.create = function(command, parts) {
    return new Command(command, parts);
  };

  Command.prototype.toString = function() {
    return "AT*"
      + this.command
      + "="
      + Sequence.next()
      + (this.parts.length ? "," : "")
      + this.parts.join(",")
      + "\r";
  };

  return Command;
});
