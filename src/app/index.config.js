(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .config(config);

  /** @ngInject */
  function config(toastrConfig, localStorageServiceProvider) {
    /**
     * Set prefix to avoid overwriting any local storage variables.
     */
    localStorageServiceProvider.setPrefix('hauseVierundzwanzig');

    /**
     * Disable using cookies as default if localStorage is not supported.
     */
    localStorageServiceProvider.setDefaultToCookie(false);

    /**
     * These properties below set the notification options for the toastr module.
     */
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 2000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
    toastrConfig.closeButton = true;
  }

})();
