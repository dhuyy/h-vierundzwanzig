(function() {
  'use strict';

  angular
    .module('hauseVierundzwanzigApp')
    .filter('facebookUrl', facebookUrl);

  function facebookUrl() {
    return function(url) {
      if (url.indexOf('pages') >= 0)
        return _getPageName(url);
      else
        return _getProfileName(url);
    };
  }

  function _getPageName(url) {
    return '@'.concat(
      url.replace('http://www.facebook.com/pages/', '')
        .replace(/%20/g, '')
        .split('/')[0]
    );
  }

  function _getProfileName(url) {
    return '@'.concat(
      url.replace('https://www.facebook.com/', '').replace('/', '')
    );
  }

})();
