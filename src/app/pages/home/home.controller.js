/* eslint no-undef: 0, angular/document-service: 0 */
(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $state, localStorageService, ArtistService) {
    var vm = this;

    vm.currentArtist = {};
    vm.isLoadingArtist = false;

    $scope.$on('onSearchArtist', function(event, args) {
      vm.isLoadingArtist = true;

      _getArtistDetails(args);
    });

    function _getArtistDetails(name) {
      ArtistService.getArtistDetails(name)
        .then(function(response) {
          console.log(response.data);
          vm.currentArtist['details'] = response.data;

          _getArtistEvents(name);
        })
        .catch(function() {

        });
    }

    function _getArtistEvents(name) {
      ArtistService.getArtistEvents(name)
        .then(function(response) {
          vm.currentArtist['events'] = response.data;

          _getArtistVideos(name);
        })
        .catch(function() {

        });
    }

    function _getArtistVideos(name) {
      ArtistService.getArtistVideos(name)
        .then(function(response) {
          vm.currentArtist['videos'] = response.data.items;

          vm.isLoadingArtist = false;
          localStorageService.set('artist', vm.currentArtist);
          $state.go('detail');
        })
        .catch(function() {

        });
    }
  }
})();
