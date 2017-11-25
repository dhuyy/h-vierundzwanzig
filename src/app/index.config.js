(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .config(config);

  /** @ngInject */
  function config(localStorageServiceProvider) {
    /**
     * Set prefix to avoid overwriting any local storage variables.
     */
    localStorageServiceProvider.setPrefix('hauseVierundzwanzig');

    /**
     * Disable using cookies as default if localStorage is not supported.
     */
    localStorageServiceProvider.setDefaultToCookie(false);
  }

})();
