(function(){
    angular
    .module('countryApp')
    .controller('AuctionsController', ['$location', 'LCB', 'Auction', '$scope', 'CloudMachine', '_', 'Inventory','$http',
    AuctionsController
])

function AuctionsController($location, LCB, Auction, $scope, CloudMachine, _, Inventory, $http) {
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
            auction.color = Auction.colorize(auction)
        })

        users.$loaded().then(function usersLoaded() {
            var me = _.find(users, {username: sessionStorage.username})
            $scope.myInventoryItems = Inventory.format(users[me.key].raw.inventory)
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
                'manifest',//***
                'inventory_transfer',//***
                'inventory_transfer_inbound',//***
                // 'sale', //?
                // 'tax_report',//?
                'vendor', //?
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
                users[me.key].raw = res
                users.$save()
                // $scope.myInventoryItems = Inventory.format(res.inventory)
                $scope.myInventoryItems.map(function(item, index){
                    _.each(auctions, function(auction){
                        // barcodeid: item.id
                        if (!auction) return
                        if (!auction.item) return
                        // console.log(auction);
                        // console.log(auction.item.id + ' ' + item.id);
                        auction.createdAtString = gettimestring(auction.createdAt)
                        if (auction.item.id === item.id) {
                            console.log(auction.color);
                            $scope.myAuctionItems.push(auction)
                            $scope.myInventoryItems.splice(index, 1)
                        }
                    })
                })
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

    function gettimestring (unixtime) {
        // console.log(unixtime);
        return new Date(unixtime).toLocaleString();
        // return unixtime *
    }
};

})();
