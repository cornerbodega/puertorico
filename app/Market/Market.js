
(function(){
    angular
    .module('countryApp')
    .factory('Market', [ 'CloudMachine',
    Market
])

function Market(CloudMachine) {

    var Market = {
        auctions: CloudMachine.auctionsRef,
        createOrder: createOrder,
        getOrder: getOrder
    }
    var order = {}
    function createOrder(auction){
        order = auction
    }
    function getOrder(){
        return order
    }
    // var auctions =
    // var auctions =

    console.log('Market!');

    return Market
};

})();
