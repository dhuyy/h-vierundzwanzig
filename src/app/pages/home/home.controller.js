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
          console.log(response);

          _getArtistEvents(name);
        })
        .catch(function() {

        });
    }

    function _getArtistEvents(name) {
      ArtistService.getArtistEvents(name)
        .then(function(response) {
          console.log(response);

          _getArtistVideos(name);
        })
        .catch(function() {

        });
    }

    function _getArtistVideos(name) {
      vm.isLoadingArtist = false;
    }
  }
})();
