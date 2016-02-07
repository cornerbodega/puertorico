
(function(){
    angular
    .module('countryApp')
    .factory('CloudMachine', [ '$firebaseObject', '$http',
    CloudMachine
])

function CloudMachine($firebaseObject, $http) {

    var cloudMachine = {
        // createAuction: createAuction
        // createCloudMachine: createCloudMachine,
        auctionsRef: auctionsRef,
        ChimpMachine: ChimpMachine,
    }

    function auctionsRef() {
        var rootRef = new Firebase("https://potnet.firebaseio.com")
        var auctions =  $firebaseObject(rootRef.child('auctions'))
        return auctions
    }

    function ChimpMachine () {
        console.log('ChimpMachine!!');
        // https://mandrillapp.com/api/1.0/

        function buy {

        }
        return {
            buy: buy
        }
    }
    // function createAuction(newAuction, fail, succeed) {
    //     var randomId = Math.round(Math.random() * 100000000);
    //     // var ref = new Firebase("https://docs-sandbox.firebaseio.com/af/obj/bindto/" + randomRoomId);
    //     // var auctionRef = ref.child(auction.item.id);
    //     var rootRef = new Firebase("https://potnet.firebaseio.com")
    //     var auctions =  $firebaseObject(rootRef.child('auctions'))
    //     // console.log(!!auctions[newAuction.item.id]);
    //     // console.log(!auctions[newAuction.item.id]);
    //     // if (!!auctions[newAuction.item.id]) {
    //     //     console.log('EXISTS!!');
    //     //     return fail( newAuction.item.id + ' is already up for auction!')
    //     // }
    //     // console.log(auctions);
    //     auctions.$bindTo($scope, "auctions")
    //     // auctions[newAuction.item.id] = newAuction
    //     // auctions.$save()
    //     //     .then(function(ref) {
    //     //         console.log('Saved!');
    //     //         // ref.key() === obj.$id; // true
    //     //         // cb(ref.key)
    //     //     }, function(error) {
    //     //         console.log("Error:", error);
    //     // });
    //     // console.log(profi/  leRef);
    //
    //     // return $firebaseObject(profileRef);
    //
    //
    // }

    return cloudMachine
};

})();
