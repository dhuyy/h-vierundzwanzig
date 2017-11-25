(function() {
  'use strict';

  /**
   * DetailController unit tests.
   */
  describe('[Detail Page tests]', function() {
    var $controller, $rootScope, $state, localStorageService;

    beforeEach(module('hauseVierundzwanzigApp'));
    beforeEach(inject(function(_$rootScope_, _$controller_, _$state_, _localStorageService_) {
      $rootScope = _$rootScope_;
      $state = _$state_;
      localStorageService = _localStorageService_;

      $controller = _$controller_('DetailController', {
        $scope: $rootScope.$new(),
        $state: $state
      })
    }));

    // it('', function() {
    //
    // });

    it('$controller.onInit() should init $controller.artist if localStorageService.get("artist") ' +
      'has value.', function() {
      localStorageService.set('artist', {
        details: {},
        events: [],
        videos: []
      });

      $controller.onInit();

      expect($controller.artist).toEqual(jasmine.any(Object));
    });

    it('$controller.onInit() should redirect to home route if localStorageService.get("artist") ' +
      'is undefined.', function() {
      localStorageService.remove('artist');

      $controller.onInit();
      $rootScope.$digest();

      expect($state.current.name).toEqual('home');
    });

    it('$controller.backToHome() should redirect to home route.', function() {
      $controller.backToHome();
      $rootScope.$digest();

      expect($state.current.name).toEqual('home');
    });

    it('$controller.showMoreVideos() should concat a chunk of video (based on .', function() {
      $controller.artist = {
        'videos': []
      };

      localStorageService.set('artist', {
        videos: [{}, {}, {}]
      });

      $controller.showMoreVideos();

      expect($controller.artist.videos.length).toBe(3);
    });
  });
})();
