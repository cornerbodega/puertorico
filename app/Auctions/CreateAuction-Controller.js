(function(){
  angular
    .module('countryApp')
    .controller('CreateAuctionController', ['$location', 'Auction', 'PATHS', '$scope', 'CloudMachine',
      CreateAuctionController
    ])

  function CreateAuctionController($location, Auction, PATHS, $scope, CloudMachine) {
    var vm = this;
    vm.auction = {}
    vm.item = Auction.item
    vm.strikeTimeOptions = strikeTimeOptions()
    vm.createAuction = createAuction
    vm.toAuction = toAuction
    var auctionsRef = CloudMachine.auctionsRef()
    auctionsRef.$bindTo($scope, 'auctions')
    // var auctionsDbRef =  new Firebase("https://potnet.firebaseio.com/auctions");
    // var syncAuctionsObject = $firebaseObject(auctionsDbRef)

    if (!Auction.item.id) $location.path(PATHS.AUCTIONS)

    function toAuction() {
        $location.path(PATHS.AUCTIONS)
    }
    function createAuction() {
        validateCreateAuction()
        if (vm.error.length > 1) return
        var newAuction = {}
        Auction.seller = sessionStorage.ubi
        Auction.createdAt = new Date().getTime()
        Auction.buyoutPrice = vm.auction.buyoutPrice
        // Auction.startingPrice = vm.auction.startingPrice
        // Auction.duration = vm.auction.duration // convert this to seconds?!
        Auction.item = vm.item
        Auction.active = true
        Auction.barcodeid = Auction.item.id
        // if (!!$scope.auctions[Auction.item.id]) return vm.error = "Erorr! " + Auction.item.id + " is already up for auction!"
        // $scope.auctions[Auction.item.id] = Auction

        var key = Auction.item.id + Auction.createdAt
        Auction.key = key
        $scope.auctions[key] = Auction
        //4820831464132201 //15 long barcodeid
        //0123456789tet345
        //1454372994564    //12 long timestamp
        console.log($scope.auctions);
        $location.path(PATHS.AUCTIONS)
    }
    // function createFail(error) {
    //     vm.error = error
    // }
    // function createSucceed(){
    //     vm.error = "Success!"
    //     console.log('Auction Created Successfully!');
    // }
    function validateCreateAuction(){
        vm.error=""
        // if(!vm.auction.duration) return vm.error="Please specify an auction duration."
        if(vm.auction.buyoutPrice < 0 || !vm.auction.buyoutPrice) return vm.error="Please specify a valid price."
        // if(vm.auction.startingPrice < 0 || !vm.auction.startingPrice) return vm.error="Please specify a valid starting price."
    }
    function strikeTimeOptions() {
        return [
            { label: '24 hours', value: 24, selected: true},
            { label: '36 hours', value: 36},
            { label: '48 hours', value: 48},
            { label: '60 hours', value: 60},
        ];
    }
  };

})();
