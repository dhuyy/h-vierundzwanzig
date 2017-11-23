/* eslint no-undef: 0, angular/document-service: 0 */
(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController() {
    var vm = this;

    vm.app = 'Hause Vierundzwanzig App';
  }
})();
