(function() {
  'use strict';

  /**
   * Unit testing the HomeController.
   */
  describe('[HomeController]', function() {
    var $controller;

    beforeEach(module('hauseVierundzwanzigApp'));
    beforeEach(inject(function(_$rootScope_, _$controller_) {
      $controller = _$controller_('HomeController', {
        $scope: _$rootScope_.$new()
      })
    }));

    // it('should $controller.app variable must have the value of "Hause Vierundzwanzig App"', function() {
    //   expect($controller.app).toEqual('Hause Vierundzwanzig App');
    // });
  });
})();
