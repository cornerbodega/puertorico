
(function(){
    angular
    .module('countryApp')
    .factory('CloudMachine', [ '$firebaseObject', '$http', '$location','$q',
    CloudMachine
])

function CloudMachine($firebaseObject, $http, $location, $q) {
    var cloudMachine = {
        // createAuction: createAuction
        // createCloudMachine: createCloudMachine,
        auctionsRef: auctionsRef,
        users: users,
        ChimpMachine: ChimpMachine,
        UserMachine: UserMachine,
        StateMachine: StateMachine,
        getSyncCheckRequest: getSyncCheckRequest
    }
    function StateMachine(){
        function syncCheck() {
            // console.log(getSyncCheckRequest());
            return getSyncCheckRequest().then(function(){
                return $http({
                    method: 'POST',
                    url: 'LCB/postWrapper',
                    data: getSyncCheckRequest(),
                    datatype: 'json',
                })
            })

        }
        function sync_check(request){
            return $http({
                method: 'POST',
                url: 'LCB/postWrapper',
                data: request,
                datatype: 'json',
            })
        }
        return { syncCheck: syncCheck, sync_check: sync_check }
    }
    function getSyncCheckRequest() {
        var defer = $q.defer()
        var tables_to_sync = [
            'vehicle',
            'employee',
            'plant_room',
            'inventory_room',
            'inventory',
            'plant',
            'plant_derivative',
            'manifest',
            'inventory_transfer',
            'inventory_transfer_inbound',
            'sale',
            'tax_report',
            'vendor',
            'qa_lab',
            'inventory_adjust',
            'inventory_qa_sample',
            'inventory_sample',
        ];
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_check",
            "data": [],
            "download": 1,
            "active": 1,
            "sessionid": sessionStorage.sessionid
        }
        // load summary sum for each table
        var users = cloudMachine.users()
        return users.$loaded().then(function(){
            console.log('users loaded');
            var me = _.find(users, {username: sessionStorage.username})
            tables_to_sync.map( function( table ) {
                var tableSum = _.find(me.summary, {table:table}).sum
                console.log(tableSum);
                if (!!tableSum) sync_check_request.data.push({table: table, active: 1, sum:tableSum})
                else sync_check_request.data.push({table: table, active: 1})
                // defer.resolve(sync_check_request)
                // console.log(sync_check_request);
                // if (me.summary) console.log(me.summary);
                // var summary = users[me.key].summary
                // console.log(summary);
                // var sum = _.find(summary, {table: table}).sum
                // console.log(sum);
                // console.log(_.find(users[me.key].summary, {table: table}));
                // sync_check_request.data.push({table: table, active: 1})
                // sync_check_request.data.push({table: table, active: 1, sum: sum})
            })
            return defer.resolve(sync_check_request)
            // console.log(sync_check_request);
            // defer.resolve(sync_check_request)
            // return sync_check_request
        })
        return defer.promise
        // talbes_to_sync
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
            var users = cloudMachine.users
            return users.$loaded().then(function usersLoaded() {
                if (!user) return console.log('Error! User undefined' + user);
                // var s = user.username.replace(/\W/g, '');
                // var username_stripped = user.username.replace(/\W/g, '')
                // var key = user.ubi + s
                // console.log(key);
                users[user.key] = user
                users.$save().then(function(){console.log('User Created Successfully: ' + user.username);})
                return user


            })
        }
        return {
            users: users,
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
