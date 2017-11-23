/* eslint no-undef: 0, angular/document-service: 0 */
(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, ArtistService) {
    var vm = this;

    vm.isLoadingArtist = false;

    $scope.$on('onSearchArtist', function(event, args) {
      vm.isLoadingArtist = true;

      _getArtistDetails(args);
    });

    function _getArtistDetails(name) {
      ArtistService.getArtistDetails(name)
        .then(function(response) {
          console.log('Details', response.data);

          _getArtistEvents(name);
        })
        .catch(function() {

        });
    }

    function _getArtistEvents(name) {
      ArtistService.getArtistEvents(name)
        .then(function(response) {
          console.log('Events', response.data);

          _getArtistVideos(name);
        })
        .catch(function() {

        });
    }

    function _getArtistVideos(name) {
      ArtistService.getArtistVideos(name)
        .then(function(response) {
          console.log('Videos', response.data.items);

          vm.isLoadingArtist = false;
        })
        .catch(function() {

        });
    }
  }
})();
