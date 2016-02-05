(function(){
  angular
    .module('countryApp')
    .controller('MarketController', ['$location', 'Auction','Market', '$scope', '_', 'PATHS',
      MarketController
    ])

  function MarketController($location, Auction, Market, $scope, _, PATHS) {
    var vm = this;
    console.log('Market Controller!');
    var auctions = Market.auctions()
    // console.log(auctions);
    $scope.auctions = []
    $scope.createBid = createBid
    function createBid(auction) {
        console.log(auction);
        Market.createOrder(auction)
        Auction.auction = auction
        $location.path(PATHS.CREATE_BID + auction.item.id)
    }
    $scope.promise = auctions.$loaded()
    $scope.promise.then(function(){
        // $scope.auctions = auctions
            _.each(auctions,function(auction){
                if (!auction) return
                if (auction.active) $scope.auctions.push(auction)

            // console.log(auction);
        })
    })

    $scope.selected = []
    $scope.orderBy = function reOrder(col) {
        console.log(col);
        $scope.sortBy = col
        $scope.reverse = !$scope.reverse
        console.log($scope.reverse);
    }
  };

})();
