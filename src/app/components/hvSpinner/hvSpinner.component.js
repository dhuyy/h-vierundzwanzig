(function() {
  'use strict';

  /** @ngInject */
  var hvSpinner = {
    bindings: {
      isLoadingArtist: '<'
    },
    templateUrl: 'app/components/hvSpinner/hvSpinner.html'
  };

  angular
    .module('hvSpinner', [])
    .component('hvSpinner', hvSpinner);

})();
