(function() {
  'use strict';

  /**
   * Unit testing the HomeController.
   */
  describe('[HomeController]', function() {
    var $controller, $rootScope, $q, localStorageService, ArtistService, artistDetailsDeferred,
      artistEventsDeferred, artistVideosDeferred;

    beforeEach(module('hauseVierundzwanzigApp'));
    beforeEach(inject(function(_$rootScope_, _$controller_, _$q_, _localStorageService_, _ArtistService_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      ArtistService = _ArtistService_;
      localStorageService = _localStorageService_;

      artistDetailsDeferred = $q.defer();
      artistEventsDeferred = $q.defer();
      artistVideosDeferred = $q.defer();

      spyOn(ArtistService, 'getArtistDetails').and.returnValue(artistDetailsDeferred.promise);
      spyOn(ArtistService, 'getArtistEvents').and.returnValue(artistEventsDeferred.promise);
      spyOn(ArtistService, 'getArtistVideos').and.returnValue(artistVideosDeferred.promise);

      $controller = _$controller_('HomeController', {
        $scope: $rootScope.$new(),
        ArtistService: ArtistService
      })
    }));

    // it('', function() {
    //
    // });

    it('should assign an object to [$controller.lastSearch] if [localStorageService.get("artist")] ' +
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

    it('should keep [$ controller.lastSearch] null when [localStorageService.get ("artist")] is ' +
      'undefined.',function() {
      localStorageService.remove('artist');

      $controller.onInit();

      expect($controller.lastSearch).toEqual(null);
    });

    it('should assign true to [$controller.isLoadingArtist] and call the [$controller.getArtistDetails()] method ' +
      'when the event [onSearchArtist] is fired.', function() {
      spyOn($controller, 'getArtistDetails');

      $rootScope.$broadcast('onSearchArtist');

      expect($controller.isLoadingArtist).toBe(true);
      expect($controller.getArtistDetails).toHaveBeenCalled();
    });

    it('should assign [response.data] to [vm.currentArtist.details] and call [$controller.getArtistEvents()] when ' +
      'the request to [ArtistService.getArtistDetails()] is successful;', function() {
      var expectedArtistDetails = {
        details: {
          name: 'Eminem'
        }
      };

      $controller.getArtistDetails();

      artistDetailsDeferred.resolve({
        data: {
          details: {
            name: 'Eminem'
          }
        }
      });
      $rootScope.$digest();

      expect($controller.currentArtist.details).toEqual(jasmine.any(Object));
      expect($controller.currentArtist.details).toEqual(expectedArtistDetails);

      expect(ArtistService.getArtistEvents).toHaveBeenCalled();
    });

    it('should assign [response.data] to [vm.currentArtist.events] and call [$controller.getArtistVideos()] when ' +
      'the request to [ArtistService.getArtistEvents()] is successful;', function() {
      var expectedArtistEvents = [{
        name: '<Bellagio Casino>'
      }];

      $controller.getArtistEvents();

      artistEventsDeferred.resolve({
        data: [{
          name: '<Bellagio Casino>'
        }]
      });
      $rootScope.$digest();

      expect($controller.currentArtist.events).toEqual(jasmine.any(Array));
      expect($controller.currentArtist.events).toEqual(expectedArtistEvents);

      expect(ArtistService.getArtistVideos).toHaveBeenCalled();
    });

    it('should assign [response.data.items] to [vm.currentArtist.videos], set [$controller.isLoadingArtist] to false, ' +
      'store [$controller.currentArtist] in Local Storage through "artist" key and call [$state.go("detail")] when ' +
      'the request to [ArtistService.getArtistVideos()] is successful;', function() {
      var expectedArtistVideos = [{
        id: 'rLicFoPtFA0',
        title: 'Costa Gold - N.A.D.A B.O.M'
      }];

      $controller.getArtistVideos();

      artistVideosDeferred.resolve({
        data: {
          items: [{
            id: 'rLicFoPtFA0',
            title: 'Costa Gold - N.A.D.A B.O.M'
          }]
        }
      });
      $rootScope.$digest();

      expect($controller.currentArtist.videos).toEqual(jasmine.any(Array));
      expect($controller.currentArtist.videos).toEqual(expectedArtistVideos);
      expect($controller.isLoadingArtist).toEqual(false);
      expect(ArtistService.getArtistVideos).toHaveBeenCalled();
    });
  });
})();
