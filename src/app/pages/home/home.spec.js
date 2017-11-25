(function() {
  'use strict';

  /**
   * HomeController unit tests.
   * Integration tests between HomeController and ArtistService
   */
  describe('[Home Page tests]', function() {
    var $controller, $rootScope, $httpBackend, $state, localStorageService, BANDSINTOWN_API, YOUTUBE_API;

    beforeEach(module('hauseVierundzwanzigApp'));
    beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$state_, _localStorageService_,
                               _BANDSINTOWN_API_, _YOUTUBE_API_) {
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      localStorageService = _localStorageService_;
      BANDSINTOWN_API = _BANDSINTOWN_API_;
      YOUTUBE_API = _YOUTUBE_API_;

      $controller = _$controller_('HomeController', {
        $scope: $rootScope.$new()
      })
    }));

    // it('', function() {
    //
    // });

    it('$controller.onInit() should init $controller.lastSearch if localStorageService.get("artist") ' +
      'has a value.', function() {
      var mockedArtist = {
        details: {
          thumb_url: '<thumb_url>',
          name: '<name>'
        }
      };

      var expectedLastSearch = {
        thumb: '<thumb_url>',
        name: '<name>'
      };

      localStorageService.set('artist', mockedArtist);
      $controller.onInit();

      expect($controller.lastSearch).toEqual(expectedLastSearch);
    });

    it('$controller.onInit() should keep $controller.lastSearch null when localStorageService.get("artist") is ' +
      'undefined.',function() {
      localStorageService.remove('artist');

      $controller.onInit();

      expect($controller.lastSearch).toEqual(null);
    });

    it('$scope.$on("onSearchArtist") should request all the necessary data to populate the Details Page.', function() {
      var artistName = 'Eminem';

      $rootScope.$broadcast('onSearchArtist', artistName);

      $httpBackend.when('GET',
        BANDSINTOWN_API['BASE_URL'].concat('/artists/', artistName, '?app_id=', BANDSINTOWN_API.APP_ID))
        .respond(200, {
          name: artistName
        });

      $httpBackend.when('GET',
        BANDSINTOWN_API['BASE_URL'].concat('/artists/', artistName, '/events', '?app_id=', BANDSINTOWN_API.APP_ID))
        .respond(200, [{
          lineup: [artistName]
        }]);

      $httpBackend.when('GET',
        YOUTUBE_API['BASE_URL'].concat('?key=', YOUTUBE_API.API_KEY, '&q=', artistName, '&part=snippet',
          '&order=relevance', '&type=video', '&maxResults=30'))
        .respond(200, {
          items: [{
            kind: 'youtube#video'
          }]
        });

      expect($controller.isLoadingArtist).toBe(true);

      $httpBackend.flush();

      expect($controller.currentArtist.details).toEqual(jasmine.any(Object));
      expect($controller.currentArtist.details.name).toEqual(artistName);

      expect($controller.currentArtist.events).toEqual(jasmine.any(Array));
      expect($controller.currentArtist.events[0].lineup[0]).toEqual(artistName);

      expect($controller.currentArtist.videos).toEqual(jasmine.any(Array));
      expect($controller.currentArtist.videos[0].kind).toEqual('youtube#video');

      expect($controller.isLoadingArtist).toBe(false);
      expect(localStorageService.get('artist')).not.toBe(null);
      expect($state.current.name).toEqual('detail');
    });
  });
})();
