/* eslint no-undef: 0, angular/document-service: 0 */
(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $state, $q, localStorageService, ArtistService) {
    var vm = this;

    vm.lastSearch = null;
    vm.currentArtist = {};
    vm.isLoadingArtist = false;

    vm.onInit = onInit;

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

      $q.all([
        ArtistService.getArtistDetails(args),
        ArtistService.getArtistEvents(args),
        ArtistService.getArtistVideos(args)
      ]).then(function(response) {
        vm.currentArtist['details'] = response[0].data;
        vm.currentArtist['events'] = response[1].data;
        vm.currentArtist['videos'] = response[2].data.items;

        vm.isLoadingArtist = false;
        localStorageService.set('artist', vm.currentArtist);
        $state.go('detail');
      });
    });
  }
})();
