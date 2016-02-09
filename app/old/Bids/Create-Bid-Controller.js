(function(){
    angular
    .module('countryApp')
    .controller('CreateBidController', ['$location', 'PATHS', 'Auction','$scope', 'Market',
    CreateBidController
])

function CreateBidController($location, PATHS, Auction, $scope, Market) {
    if (!Auction.auction) $location.path(PATHS.MARKET)
    $scope.auction = Auction.auction
    $scope.toMarket = toMarket

    var auctionsRef = Market.auctions()
    auctionsRef.$loaded().then(function(){
        $scope.buy = buy
        auctionsRef.$bindTo($scope, 'auctions')
    })

    function buy(){
        var auction = _.find($scope.auctions, {barcodeid: Auction.auction.item.id, createdAt: Auction.auction.createdAt})
        console.log(auction);
        $scope.auctions[auction.key].buyer = sessionStorage.ubi
        $scope.auctions[auction.key].active = false;
        // auctions[12] = 'marv'
        // console.log($scope.auctions[auction.key]);
        // console.log($scope.auctions);
        $location.path(PATHS.BIDS)
        // console.log('BUY');
    }
    function toMarket() {
        $location.path(PATHS.MARKET)
    }
};

})();
