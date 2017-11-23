(function() {
  'use strict';

  /**
   * Unit testing the loadingScreen component.
   */
  describe('[LoadingScreen Component]', function() {
    var $rootScope, $scope, $element, $q, $animate, animateDeferred;

    beforeEach(module('hauseVierundzwanzigApp'));
    beforeEach(inject(function($compile, _$rootScope_, _$q_, _$animate_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $q = _$q_;
      $animate = _$animate_;

      animateDeferred = $q.defer();

      spyOn($animate, 'leave').and.returnValue(animateDeferred.promise);

      $element = angular.element('<div class="loading-screen"></div>');

      $compile($element)($scope);
      $rootScope.$digest();
    }));

    it('should be rendered.', function() {
      expect($element.html()).not.toEqual(null);
    });

    it('should call the leave method to remove the component from the DOM.', function() {
      animateDeferred.resolve();
      $rootScope.$digest();

      expect($animate.leave).toHaveBeenCalled();
    });
  });
})();
