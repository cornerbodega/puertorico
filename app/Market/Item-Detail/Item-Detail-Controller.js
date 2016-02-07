(function(){
    angular
    .module('countryApp')
    .controller('ItemDetailController', ['$location', 'Auction', '$scope', '_', 'PATHS',
    ItemDetailController
])

function ItemDetailController($location, Auction, $scope, _, PATHS) {
    var vm = this;
    console.log('ItemDetail Controller!');
    $scope.auction = Auction.auction
    if(!$scope.auction) $location.path(PATHS.MARKET)
    // console.log($scope.Auction);
    

};

})();
