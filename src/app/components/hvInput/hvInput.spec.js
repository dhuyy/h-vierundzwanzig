(function() {
  'use strict';

  /**
   * hvInput unit tests.
   */
  describe('[hvInput component tests]', function() {
    var $controller, $scope, $rootScope, $element;

    beforeEach(module('hauseVierundzwanzigApp'));
    beforeEach(inject(function(_$rootScope_, $compile) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      $element = angular.element('<hv-input></hv-input>');

      $compile($element)($scope);
      $scope.$digest();

      $controller = $element.controller('hvInput');
    }));

    it('hvInput should be compiled.', function() {
      expect($element.html()).not.toEqual(null);
    });

    it('', function() {
      spyOn($rootScope, '$broadcast');

      $controller.onSearchArtist(
        { preventDefault: function(){} }
      );

      expect($rootScope.$broadcast).toHaveBeenCalledWith('onSearchArtist', '');
    });
  });
})();
