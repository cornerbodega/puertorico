
(function(){
    angular
    .module('countryApp')
    .factory('Inventory', [ 'LCB', '$q', '$http','CloudMachine','_',
    Inventory
])

function Inventory(LCB, $q, $http, CloudMachine,_) {

    var inventory = {
        raw: [],
        // refresh: refresh,
        format: format
    }

    // auctionsRef.$bindTo($scope, 'auctions')
    // var auctions = $firebaseObject(auctionsRef)
    function format(inventory) {

        // console.log(auctions["6033472250000184"]);
        return sortbykey(inventory.map(function(item){
            var info = getinventorytypeinfo(item.inventorytype)
            item.remaining_quantity = parseFloat(item.remaining_quantity).toFixed(2)
            item.usable_weight = parseFloat(item.usable_weight).toFixed(2)
            item.type = info.label
            // console.log(auctions[item.id]);
            // console.log(auctions[item.id]);
            // if (auctions[item.id]){ console.log('MATCH!!'); item.auction = auctions[item.id]}
            console.log(item);
            return item
        }), 'sessiontime')
    }
    // function refresh() {
    //     var defer = $q.defer();
    //     // console.log(CloudMachine.StateMachine().syncCheck())
    //     // CloudMachine.StateMachine().syncCheck().then().then(function(res){
    //     //     console.log(res);
    //     // })
    //     return users.$loaded(function(){
    //         var me = _.find(users, {username: sessionStorage.username})
    //         console.log(me);
    //         // me.summary = res.summary
    //         // var = CloudMachine.StateMachine().
    //         // load data from firebase first!
    //         // then return promise,
    //
    //     // then update db and client as part of callback
    //
    //         users[me.key] = me
    //         users.$save()
    //
    //     })
    //     //
    //     //     console.log(res.inventory);
    //     //     // var users = CloudMachine.users()
    //     //     // users.$loaded(function(){
    //     //     //     var me = _.find(users, {username: sessionStorage.username})
    //     //     //     console.log(me);
    //     //     //     me.summary = res.summary
    //     //     //     users[me.key] = me
    //     //     //     users.$save()
    //     //     // })
    //     //     // format(res.inventory)
    //
    //     // defer.resolve(format(res.inventory))
    //
    //     // $http.get()
    //     // LCB.post({action:'sync_inventory'}, LCB.fail, function(res) {
    //     //     console.log(res);
    //     //     defer.resolve(format(res.inventory))
    //     // })
    //     // return defer.promise
    // }

    function getinventorytypeinfo (typeid) {
        var typemap = gettypemap();
        return typemap[typeid];
    }
    function gettypemap () {
        var typemap = {
            5: {label:'Kief', weighable:true, backrgound:'red'},
            6: {label: 'Flower', weighable:true, background:'blue'},
            7: {label: 'Clone', weighable: true},
            9: {label: 'Other Plant Material', weighable: true},
            10: {label: 'Seed', weighable: false, seed: true},
            11: {label: 'Plant Tissue', weighable: true},
            12: {label: 'Mature Plant', weighable: true},
            13: {label: 'Flower Lot', weighable: true},
            14: {label: 'Other Plant Material Lot', weighable: true},
            15: {label: 'Bubble Hash', weighable: true},
            16: {label: 'Hash', weighable: true},
            17: {label: 'Hydrocarbon Wax', weighable: true},
            18: {label: 'CO2 Hash Oil', weighable: true},
            19: {label: 'Food Grade Solvent Extract', weighable: true},
            20: {label: 'Infused Dairy Butter or Fat in Solid Form', weighable: true},
            21: {label: 'Infused Cooking Oil', weighable: true},
            22: {label: 'Solid Infused Edible', weighable: false},
            23: {label: 'Liquid Infused Edible', weighable: false},
            24: {label: 'Extract for Inhalation', weighable: false},
            25: {label: 'Infused Topicals', weighable: false},
            26: {label: 'Sample Jar', weighable: false},
            27: {label: 'Waste', weighable: true},
            28: {label: 'Usable Marijuana', weighable: false},
            29: {label: 'Wet Flower', weighable: true},
            30: {label: 'Marijuana Mix', weighable: true},
            31: {label: 'Marijuana Mix Packaged', weighable: false},
            32: {label: 'Marijuana Mix Infused', weighable: false}
        }
        return typemap;
    }

    function sortbykey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }
    console.log('inventory');
    console.log(inventory);
    return inventory
};

})();
