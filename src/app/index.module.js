/* eslint angular/timeout-service: 0 */
(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp', [
      /**
       * Native modules
       */
      'ngAnimate',
      'ngSanitize',
      'ngMessages',
      'ngAria',

      /**
       * Project modules
       */
      'loadingScreen',
      'hvInput',
      'hvSpinner',

      /**
       * Third-party modules
       */
      'LocalStorageModule',
      'ui.router',
      'ngNotify'
    ]);

  /**
   * This timeout delays the bootstrap of the app in 2 seconds in order to show the loading animation,
   * simulating the loading of the application on the internet.
   */
  setTimeout(function() {
    angular.bootstrap(document, ['hauseVierundzwanzigApp']);
  }, 100);

})();
