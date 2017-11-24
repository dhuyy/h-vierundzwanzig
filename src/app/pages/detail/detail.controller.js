/* eslint no-undef: 0, angular/document-service: 0 */
(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .controller('DetailController', DetailController);

  /** @ngInject */
  function DetailController($state, localStorageService) {
    var vm = this;

    vm.backToHome = backToHome;

    vm.artist = null;

    function _onInit() {
      vm.artist = localStorageService.get('artist');
    }
    _onInit();

    function backToHome() {
      localStorageService.remove('artist');

      $state.go('home');
    }
  }
})();
