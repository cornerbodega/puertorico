(function(){
    angular
    .module('countryApp')

    .directive('marketParallax', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'Market/templates/market-parallax.html',
            link: function (scope, element, attrs) {
                element.find('.parallax').parallax()
                console.log( element.find('.parallax').parallax());
            }
        }
    })
})();
