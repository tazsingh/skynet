describe("Controls", function() {
  var scope;

  beforeEach(inject([
    "$controller"
  , "$rootScope"
  , function($controller, $rootScope) {

    scope = $rootScope.$new();

    $controller("Controls", {
      $scope: scope
    });
  }]));

  it("exists", function() {
    scope.should.exist;
  });
});
