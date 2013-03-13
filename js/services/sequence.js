skynet.factory("Sequence", function() {
  var Sequence = {}
    , sequence = 0;

  Sequence.next = function() {
    sequence++;

    return sequence;
  }

  Sequence.reset = function() {
    sequence = 0;
  }

  return Sequence;
});
