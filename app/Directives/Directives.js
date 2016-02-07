(function(){
    angular
    .module('countryApp')

    .directive('marketCard', function ($compile, CloudMachine) {
        return {
            restrict: 'E',
            scope: {
                auction: '='
            },
            templateUrl: 'Market/templates/market-card.html',
            link: function (scope, element, attrs) {
                console.log(scope.auction);
                scope.buy = function buy(auction) {
                    // https://mandrillapp.com/api/1.0/
                    console.log('Buy!!');
                    console.log(auction);
                    // CloudMachine.ChimpMachine.buy(auction)
                    
                }
            }
        }
    })
})();
