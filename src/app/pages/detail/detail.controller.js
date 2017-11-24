/* eslint no-undef: 0, angular/document-service: 0 */
(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .controller('DetailController', DetailController);

  /** @ngInject */
  function DetailController($state, localStorageService) {
    var vm = this;
    var NUMBER_VIDEOS_TO_LOAD = 10;

    vm.artist = null;

    vm.MAX_VIDEOS_RESULTS = 30;

    vm.onInit = onInit;
    vm.backToHome = backToHome;
    vm.showMoreVideos = showMoreVideos;

    function onInit() {
      var artist = localStorageService.get('artist');

      if (!artist)
        $state.go('home');

      vm.artist = {
        details: artist.details,
        events: artist.events,
        videos: artist.videos.slice(0, NUMBER_VIDEOS_TO_LOAD)
      };
    }

    function backToHome() {
      $state.go('home');
    }

    function showMoreVideos() {
      var visibleVideos = vm.artist['videos'];
      var cachedVideos = localStorageService.get('artist')['videos'];

      vm.artist['videos'] = visibleVideos.concat(
        cachedVideos.slice(visibleVideos.length, visibleVideos.length + NUMBER_VIDEOS_TO_LOAD)
      );
    }
  }
})();
