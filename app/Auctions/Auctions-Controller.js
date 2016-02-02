(function(){
    angular
    .module('countryApp')
    .controller('AuctionsController', ['$location', 'LCB', 'InventoryItems','PATHS', 'Auction', '$scope', 'CloudMachine', '_',
    AuctionsController
])

function AuctionsController($location, LCB, InventoryItems, PATHS, Auction, $scope, CloudMachine, _) {
    var vm = this;
    // vm.items = InventoryItems;
    vm.createAuction = createAuction;
    $scope.myAuctionItems = []
    var auctions = CloudMachine.auctionsRef()
    auctions.$loaded().then(function(){
        $scope.myInventoryItems = _.filter(InventoryItems, function(item){
            console.log(item);
            if(_.find(auctions, {barcodeid: item.id})) return false
            return true

            // _.each(auctions, function(auction){
            //     // barcodeid: item.id
            //     if (!auction) return false
            //     if (!auction.item) return false
            //     // console.log(auction);
            //     // console.log(auction.item.id + ' ' + item.id);
            //     if (auction.item.id === item.id) return false
            //     return true
            // })
        })

        // $scope.myInventoryItems = _.filter(InventoryItems, function(item) {
        //     console.log(item.id);
        //     return _.find(auctions, function(auction) {
        //         console.log(auction);
        //         if (!auction) return
        //         if (!auction.item) return
        //         // if (typeof auction.item === 'null') return
        //         return auction.item.id != item.id
        //     })
        // })
        // $scope.myInventoryItems.
        InventoryItems.map(function(item){
            _.each(auctions, function(auction){
                // barcodeid: item.id
                if (!auction) return
                if (!auction.item) return
                // console.log(auction);
                // console.log(auction.item.id + ' ' + item.id);
                if (auction.item.id === item.id) $scope.myAuctionItems.push(auction)

            })
            // $scope.myAuctionItems.push(auctions[item.id])

            // if (!!auctions[item.id]){
            //     $scope.myAuctionItems.push(auctions[item.id])
            //
            // }
            // console.log($scope.auctions);
        })
        console.log($scope.myAuctionItems);

        // console.log(auctionsRef["6020939240000327"]);
    })
    // auctionsRef.$bindTo($scope, 'auctions')

    // $scope.myItems = InventoryItems.map(function(item){
    //     // if (!!$scope.auctions[item.id]) item.auction = $scope.auctions[item.id]
    //     console.log($scope.auctions);
    // })

    function createAuction(item) {
        Auction.item = item
        $location.path(PATHS.CREATE_AUCTION + item.id)
    }
};

})();
