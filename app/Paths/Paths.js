
(function(){
    angular
    .module('countryApp')
    .factory('PATHS', [
    PATHS
])

function PATHS() {
    var PATHS = {
        MARKET:   '/market',
        BIDS:     '/bids',
        AUCTIONS: '/auctions',
        CREATE_AUCTION: '/auctions/create/', //:id
        CREATE_BID: '/bids/create/', //:id,
        ITEM_DETAIL: '/market/item' //:id
    }

    return PATHS
};

})();
