(function() {
  'use strict';

  /** @ngInject */
  var hvSpinner = {
    bindings: {
      isLoading: '<'
    },
    templateUrl: 'app/components/hvSpinner/hvSpinner.html'
  };

  angular
    .module('hvSpinner', [])
    .component('hvSpinner', hvSpinner);

})();
