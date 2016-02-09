(function(){
    angular
    .module('countryApp')
    .controller('BidsController', ['$location', '$scope', 'Market', '_',
    BidsController
])

function BidsController($location, $scope, Market, _) {
    var auctionsRef = Market.auctions()
    auctionsRef.$loaded().then(function(){
        auctionsRef.$bindTo($scope, 'auctions').then(function(){
            $scope.myOrders = myOrders()
            console.log($scope.auctions);

        })
        // console.log(auctionsRef);

        // console.log($scope.myOrders);
    })


    function myOrders() {
        // console.log(sessionStorage.ubi);
        // console.log(auctions);
        // return auctions
        return _.filter($scope.auctions, {buyer: sessionStorage.ubi})
    }
};

})();
