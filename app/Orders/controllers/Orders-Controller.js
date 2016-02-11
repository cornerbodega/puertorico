(function(){
    angular
    .module('countryApp')
    .controller('OrdersController', ['$location', 'LCB', 'Auction', '$scope', 'CloudMachine', '_', 'Inventory','$http',
    OrdersController
])

function OrdersController($location, LCB, Auction, $scope, CloudMachine, _, Inventory, $http) {
    var PATHS = window.PATHS
    var vm = this;
    // vm.items = InventoryItems;
    $scope.toOrderDetail = toOrderDetail;

    var auctions = CloudMachine.auctionsRef()

    auctions.$loaded().then(function auctionsLoaded() {
        var users = CloudMachine.users()
        $scope.orders = _.filter(auctions, { buyer: sessionStorage.ubi })
        // $scope.headers = []
        // users.$loaded().then(function usersLoaded() {
        //     console.log(users);
        //     // var me = _.find(users, {username: sessionStorage.username})
        //
        //
        // })
    })
    function toOrderDetail(order) {
        Auction.order = order
        // console.log(auction.item);
        // console.log(PATHS.AUCTION_DETAIL+ auction.item.id);
        $location.path(PATHS.ORDER_DETAIL+order.item.id)
    }


};

})();
