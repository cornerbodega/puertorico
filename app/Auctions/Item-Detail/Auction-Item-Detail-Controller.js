(function(){
    angular
    .module('countryApp')
    .controller('AuctionItemDetailController', ['$location', 'LCB', 'Auction', '$scope', 'CloudMachine', '_', 'Inventory','$http',
    AuctionItemDetailController
])

function AuctionItemDetailController($location, LCB, Auction, $scope, CloudMachine, _, Inventory, $http) {
    var PATHS = window.PATHS
    var vm = this;
    // vm.items = InventoryItems;
    // $scope.toAuctionDetail = toAuctionDetail;
    // vm.createAuction = createAuction;
    // $scope.myAuctionItems = []
    // var auctions = CloudMachine.auctionsRef()

    $scope.auction = Auction.auction
    if (!$scope.auction) back()

    function back() {
        // console.log(back!);
        $location.path(PATHS.INVENTORY)
    }
    // auctions.$loaded().then(function auctionsLoaded() {
    //     var users = CloudMachine.users()
    //     // $scope.auction = auction
    //     users.$loaded().then(function usersLoaded() {
    //
    //     })
    // })

    // function toAuctionDetail(auction) {
    //     // Auction.item = item
    //     // console.log(auction.item);
    //     console.log(PATHS.AUCTION_DETAIL+ auction.item.id);
    //     $location.path(PATHS.AUCTION_DETAIL+auction.item.id)
    // }
    //
    // function createAuction(item) {
    //     Auction.item = item
    //     $location.path(PATHS.CREATE_AUCTION + item.id)
    // }
};

})();
