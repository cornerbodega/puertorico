(function(){
    angular
    .module('countryApp')
    .controller('AuctionsController', ['$location', 'LCB', 'Auction', '$scope', 'CloudMachine', '_', 'Inventory','$http','AuctionUtils',
    AuctionsController
])

function AuctionsController($location, LCB, Auction, $scope, CloudMachine, _, Inventory, $http, AuctionUtils) {
    var PATHS = window.PATHS
    var vm = this;
    // vm.items = InventoryItems;
    $scope.toAuctionDetail = toAuctionDetail;
    vm.createAuction = createAuction;
    $scope.myAuctionItems = []
    var auctions = CloudMachine.auctionsRef()

    auctions.$loaded().then(function auctionsLoaded() {
        var users = CloudMachine.users()

        _.each(auctions, function(auction){
            if (!auction) return
            if (!auction.status) return
            console.log(auction);
            auction.color = AuctionUtils.colorize(auction)
        })
        auctions.$save()
        users.$loaded().then(function usersLoaded() {
            var me = _.find(users, {username: sessionStorage.username})
            // $scope.myInventoryItems = Inventory.format(users[me.key].raw.inventory)
            $scope.myInventoryItems = Inventory.format(users[me.key].raw.inventory)
            $scope.myAuctionItems = _.filter(auctions, {seller: sessionStorage.ubi})
console.log($scope.myAuctionItems);
            console.log(users);
            console.log(auctions);
            var tables_to_sync = [
                // 'vehicle', //***
                // 'employee', //***
                // 'plant_room',//trace
                // 'inventory_room',//trace
                'inventory',
                // 'plant', //trace
                // 'plant_derivative', //trace
                // 'manifest',//***
                // 'inventory_transfer',//***
                // 'inventory_transfer_inbound',//***
                // 'sale', //?
                // 'tax_report',//?
                // 'vendor', //?
                // 'qa_lab', //***?
                // 'inventory_adjust',
                // 'inventory_qa_sample',//***
                // 'inventory_sample',  //***
            ];
            var sync_check_request = {
                "API": "4.0",
                "action": "sync_check",
                "data": [],
                "download": 1,
                "active": 1,
                "sessionid": sessionStorage.sessionid
            }
            tables_to_sync.map( function( table ) {
                var tableSum = _.find(me.summary, {table:table}).sum
                console.log(tableSum);
                // if (!!tableSum) sync_check_request.data.push({table: table, active: 1, sum:tableSum})
                // else sync_check_request.data.push({table: table, active: 1})
                sync_check_request.data.push({table: table, active: 1})
            })
            console.log(sync_check_request);
            $http({
                method: 'POST',
                url: 'LCB/postWrapper',
                data: sync_check_request,
                datatype: 'json',
            }).success(function (res) {
                console.log(res);
                // REPLACE THIS WITH MONGOLAB IF TRANSFERS A PROBLEM
                users[me.key].raw = res
                users.$save()
                // $scope.myInventoryItems = Inventory.format(res.inventory)
                $scope.myInventoryItems = _.filter($scope.myInventoryItems, function(item){
                    if (_.findWhere($scope.myAuctionItems, {barcodeid: item.id})) return false;
                    return true
                })
                $scope.myAuctionItems = _.filter(auctions, {seller: sessionStorage.ubi})
                console.log($scope.myAuctionItems);
                // $scope.myInventoryItems.map(function(item, index){
                //
                //     _.each(auctions, function(auction){
                //         // barcodeid: item.id
                //         if (!auction) return
                //         if (!auction.item) return
                //
                //         // console.log(auction);
                //         // console.log(auction.item.id + ' ' + item.id);
                //         if (_.find(auction, {}))
                //         // console.log(auction.barcodeid === item.id);
                //         // if (auction.item.id === item.id) {
                //         //     // console.log(auction.color);
                //         //     console.log(item);
                //         //     $scope.myAuctionItems.push(auction)
                //         //     $scope.myInventoryItems.splice(index, 1)
                //         // }
                //     })
                // })
                // var tt = []

                // $scope.myAuctionItems =
            })

        })
    })

    function toAuctionDetail(auction) {
        Auction.auction = auction
        // console.log(auction.item);
        // console.log(PATHS.AUCTION_DETAIL+ auction.item.id);
        $location.path(PATHS.AUCTION_DETAIL+auction.item.id)
    }

    function createAuction(item) {
        Auction.item = item
        $location.path(PATHS.CREATE_AUCTION + item.id)
    }


};

})();
