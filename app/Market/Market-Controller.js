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
    $scope.sortBy = 'createdAt'
    $scope.reverse = 'true'
    $scope.auctions = []
    // $scope.createBid = createBid
    // function createBid(auction) {
    //     console.log(auction);
    //     Market.createOrder(auction)
    //     Auction.auction = auction
    //     $location.path(PATHS.CREATE_BID + auction.item.id)
    // }
    auctions.$loaded().then(function(){
        // $scope.auctions = auctions
        auctions.$bindTo($scope, 'auctionsDB').then(function(){
            console.log();
            $scope.auctions = _.filter($scope.auctionsDB, {status: window.AUCTION_STATUS.FOR_SALE})
                // if (!auction) return
                // if (auction.active) $scope.auctions.push(auction)

                // console.log(auction);
            // })
        })

    })
    $scope.auctions.map(function formatAuctions(auction){
        auction.description_label = auction.item.productname + ' ' + auction.item.strain + ' (' + auction.item.type +') '
    })
    $scope.headers = [
        {
            name:'',
            field:'thumb'
        },{
            name: 'Description',
            field: 'description_label'
        },{
            name:'Quantity',
            field: 'quantity_label'
        },{
            name: 'Price',
            field: 'last_modified'
        }
    ];

    $scope.selected = []
    $scope.orderBy = function reOrder(col) {
        console.log(col);
        $scope.sortBy = col
        $scope.reverse = !$scope.reverse
        console.log($scope.reverse);
    }
};

})();
