
(function(){
    angular
    .module('countryApp')
    .factory('CloudMachine', [ '$firebaseObject', '$http', '$location',
    CloudMachine
])

function CloudMachine($firebaseObject, $http, $location) {

    var cloudMachine = {
        // createAuction: createAuction
        // createCloudMachine: createCloudMachine,
        auctionsRef: auctionsRef,
        users: users,
        ChimpMachine: ChimpMachine,
        UserMachine: UserMachine,
    }

    function auctionsRef() {
        var rootRef = new Firebase("https://potnet.firebaseio.com")
        var auctions =  $firebaseObject(rootRef.child('auctions'))
        return auctions
    }
    function users() {
        return users = $firebaseObject(new Firebase("https://potnet.firebaseio.com").child('users'))
        // var auctions =  $firebaseObject(rootRef.child('auctions'))
        // return auctions
    }
    function UserMachine() {
        function createUser(user) {
            var users = cloudMachine.users()
            return users.$loaded().then(function usersLoaded() {
                if (!user) return console.log('Error! User undefined' + user);
                var s = user.username.replace(/\W/g, '');
                // var username_stripped = user.username.replace(/\W/g, '')
                var key = user.ubi + s
                console.log(key);
                users[key] = user
                users.$save().then(function(){console.log('User Created Successfully: ' + user.username);})
                return user


            })
        }
        return {
            createUser: createUser
        }
    }
    function ChimpMachine () {
        console.log('ChimpMachine!!');
        // https://mandrillapp.com/api/1.0/

        function buy(auction) {
            $http({
                method: 'POST',
                url: '/textMessage/test',
                data: { auction: auction },
                datatype: 'json',
            }).success(function (res) {

            });
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
