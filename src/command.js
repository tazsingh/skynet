SKYNET.Command = function(command, parts) {
  this.command = command;
  this.parts = parts || [];
};

SKYNET.Command.prototype.create = function(command, parts) {
  return new SKYNET.Command(command, parts);
};

SKYNET.Command.prototype.toString = function() {
  return "AT*"
    + this.command
    + "="
    + SKYNET.Sequence.next()
    + (this.parts.length ? "," : "")
    + this.parts.join(",")
    + "\r";
};
