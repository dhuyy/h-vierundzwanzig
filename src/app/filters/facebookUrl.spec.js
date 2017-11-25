(function() {
  'use strict';

  /**
   * facebookUrl unit tests.
   */
  describe('[facebookUrl filter tests]', function() {
    var $filter;

    beforeEach(module('hauseVierundzwanzigApp'));
    beforeEach(inject(function(_$filter_) {
      $filter = _$filter_;
    }));

    it('facebookUrl filter should extract the profile name from' +
      'the url profile', function() {
      var page = 'https://www.facebook.com/AnittaOficial/';
      var result;

      result = $filter('facebookUrl')(page);

      // Assert.
      expect(result).toEqual('@AnittaOficial');
    });

    it('facebookUrl filter should extract the page name from' +
      'the url page', function() {
      var page = 'http://www.facebook.com/pages/Red%20Hot%20Chili%20Peppers/8335563918';
      var result;

      result = $filter('facebookUrl')(page);

      // Assert.
      expect(result).toEqual('@RedHotChiliPeppers');
    });
  });
})();
