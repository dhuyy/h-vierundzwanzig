/* eslint no-undef: 0, angular/document-service: 0 */
(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $state, localStorageService, ArtistService) {
    var vm = this;

    vm.lastSearch = null;
    vm.currentArtist = {};
    vm.isLoadingArtist = false;

    vm.onInit = onInit;
    vm.getArtistDetails = getArtistDetails;
    vm.getArtistEvents = getArtistEvents;
    vm.getArtistVideos = getArtistVideos;

    function onInit() {
      var artist = localStorageService.get('artist');

      if (artist) {
        vm.lastSearch = {
          thumb: artist.details.thumb_url,
          name: artist.details.name
        }
      }
    }

    $scope.$on('onSearchArtist', function(event, args) {
      vm.isLoadingArtist = true;

      vm.getArtistDetails(args);
    });

    function getArtistDetails(name) {
      ArtistService.getArtistDetails(name)
        .then(function(response) {
          vm.currentArtist['details'] = response.data;

          getArtistEvents(name);
        });
    }

    function getArtistEvents(name) {
      ArtistService.getArtistEvents(name)
        .then(function(response) {
          vm.currentArtist['events'] = response.data;

          getArtistVideos(name);
        });
    }

    function getArtistVideos(name) {
      ArtistService.getArtistVideos(name)
        .then(function(response) {
          vm.currentArtist['videos'] = response.data.items;

          vm.isLoadingArtist = false;
          localStorageService.set('artist', vm.currentArtist);
          $state.go('detail');
        });
    }
  }
})();
