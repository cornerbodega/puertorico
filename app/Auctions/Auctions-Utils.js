
(function(){
    angular
    .module('countryApp')
    .factory('AuctionUtils', [
    AuctionUtils
])

function AuctionUtils() {

    var utils = {
        item: {},
        colorize: colorize
        // createAuction: createAuction,
    }

    function gettimestring (unixtime) {
        // console.log(unixtime);
        return new Date(unixtime).toLocaleString();
        // return unixtime *
    }

    function colorize(auction) {
        auction.createdAtString = gettimestring(auction.createdAt)
        console.log(auction);
        console.log('colors');
        var S = window.AUCTION_STATUS
        if(auction.status === S.FOR_SALE) return 'green lighten-4'
        if(auction.status === S.RESERVED) return 'blue lighten-4'
    }
    return utils
};

})();
