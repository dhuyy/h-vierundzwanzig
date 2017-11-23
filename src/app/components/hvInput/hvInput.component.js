(function() {
  'use strict';

  /** @ngInject */
  var hvInput = {
    bindings: {
      placeholder: '@'
    },
    controller: function ($scope) {
      this.artist = '';

      this.onSearchArtist = onSearchArtist;

      /**
       * This code triggers the event "onSearchArtist" to search an artist.
       */
      function onSearchArtist(e) {
        e.preventDefault();

        $scope.$emit('onSearchArtist', this.artist);
      }
    },
    templateUrl: 'app/components/hvInput/hvInput.html'
  };

  angular
    .module('hvInput', [])
    .component('hvInput', hvInput);

})();
