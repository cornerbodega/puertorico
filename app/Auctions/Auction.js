
(function(){
    angular
    .module('countryApp')
    .factory('Auction', [
    Auction
])

function Auction() {

    var auction = {
        item: {},
        // colorize: colorize
        // createAuction: createAuction,
    }

    // function colorize(auction) {
    //     console.log(auction);
    //     console.log('colors');
    //     var S = window.AUCTION_STATUS
    //     if(auction.status === S.FOR_SALE) return 'green lighten-4'
    //     if(auction.status === S.RESERVED) return 'blue lighten-4'
    // }
    return auction
};

})();
