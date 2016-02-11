
(function(){
  angular
    .module('countryApp')
    .controller('IndexController', ['$location',
      IndexController
    ])


  function IndexController($location) {
    var vm = this;
        console.log('Index Controller!');
    var PATHS = window.PATHS
    vm.toMarket = toMarket;
    vm.toOrders = toOrders;
    vm.toAuctions = toAuctions;
    vm.username = sessionStorage.username
    if (!sessionStorage.sessionid) $location.path(PATHS.LANDING)
    function toMarket() {
        vm.market = "z-depth-4"
        vm.bids = false
        vm.auctions = false
        $location.path(PATHS.MARKET)
    }
    function toOrders() {
        vm.market = false
        vm.bids = "z-depth-4"
        vm.auctions = false
        $location.path(PATHS.ORDERS)
    }
    function toAuctions() {
        vm.market = false
        vm.bids = false
        vm.auctions = "z-depth-4"
        $location.path(PATHS.AUCTIONS)
    }
  };

})();
