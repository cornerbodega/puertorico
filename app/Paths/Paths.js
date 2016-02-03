
(function(){
    angular
    .module('PATHS',[])
    .factory('PATHS', [
    PATHS
])
function PATHS() {
    console.log('PATHS!!');
    var PATHS = {
        MARKET:   '/market',
        BIDS:     '/bids',
        AUCTIONS: '/auctions',
        CREATE_AUCTION: '/auctions/create/', //:id
        CREATE_BID: '/bids/create/', //:id
    }

    return PATHS
};

})();
