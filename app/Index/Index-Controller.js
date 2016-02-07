
(function(){
  angular
    .module('countryApp')
    .controller('IndexController', ['$location', 'PATHS',
      IndexController
    ])


  function IndexController($location, PATHS) {
    var vm = this;
        console.log('Index Controller!');

    vm.toMarket = toMarket;
    vm.toBids = toBids;
    vm.toAuctions = toAuctions;
    vm.username = sessionStorage.username
    if (!sessionStorage.sessionid) $location.path(PATHS.LANDING)
    function toMarket() {
        vm.market = "z-depth-4"
        vm.bids = false
        vm.auctions = false
        $location.path(PATHS.MARKET)
    }
    function toBids() {
        vm.market = false
        vm.bids = "z-depth-4"
        vm.auctions = false
        $location.path(PATHS.BIDS)
    }
    function toAuctions() {
        vm.market = false
        vm.bids = false
        vm.auctions = "z-depth-4"
        $location.path(PATHS.AUCTIONS)
    }
  };

})();
