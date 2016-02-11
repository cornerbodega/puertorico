(function(){
    angular
    .module('countryApp')
    .controller('OrderDetailController', ['$location', 'LCB', 'Auction', '$scope', 'CloudMachine', '_', 'Inventory','$http',
    OrderDetailController
])

function OrderDetailController($location, LCB, Auction, $scope, CloudMachine, _, Inventory, $http) {
    var PATHS = window.PATHS
    var vm = this;
    // vm.items = InventoryItems;
    $scope.order = Auction.order;
    $scope.back = back
    if (!$scope.order) back()
    function back() {
        $location.path(PATHS.ORDERS)
    }

};

})();
