
(function(){
  angular
    .module('countryApp')
    .controller('IndexController', ['$location',
      IndexController
    ])


  function IndexController($location) {
    var vm = this;
        console.log('Index Controller!');
    var PATHS = {MARKET:'/market'}
    vm.toMarket = toMarket;
    vm.toBids = toBids;
    vm.toAuctions = toAuctions;

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
