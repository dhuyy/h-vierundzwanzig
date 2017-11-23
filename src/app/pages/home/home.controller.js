/* eslint no-undef: 0, angular/document-service: 0 */
(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope) {

    $scope.$on('onSearchArtist', function(event, args) {
      console.log(args);
    });
  }
})();
