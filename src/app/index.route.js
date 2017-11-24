(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/pages/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('detail', {
        url: '/detail',
        templateUrl: 'app/pages/detail/detail.html',
        controller: 'DetailController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
