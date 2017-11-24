(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .filter('facebookUrl', facebookUrl);

  function facebookUrl() {
    return function(url) {
      var profile = '@';

      return profile.concat(
        url.replace('https://www.facebook.com/', '').replace('/', '')
      );
    };
  }

})();
