
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
    if (!sessionStorage.sessionid) $location.path(PATHS.LANDING)
    function toMarket() {
        $location.path(PATHS.MARKET)
    }
    function toBids() {
        $location.path(PATHS.BIDS)
    }
    function toAuctions() {
        $location.path(PATHS.AUCTIONS)
    }
  };

})();
