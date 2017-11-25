(function() {
  'use strict';

  /** @ngInject */
  var hvInput = {
    bindings: {
      placeholder: '@',
      setDisabled: '<'
    },
    controller: function ($rootScope) {
      this.artist = '';

      this.onSearchArtist = onSearchArtist;

      /**
       * This code triggers the event "onSearchArtist" to search an artist.
       */
      function onSearchArtist(e) {
        e.preventDefault();

        $rootScope.$broadcast('onSearchArtist', this.artist);
      }
    },
    templateUrl: 'app/components/hvInput/hvInput.html'
  };

  angular
    .module('hvInput', [])
    .component('hvInput', hvInput);

})();
