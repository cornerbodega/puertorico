
(function(){
    angular
    .module('countryApp')
    .controller('InboundTransfersController', ['$scope','$location', 'LCB', 'CloudMachine', '_',
    InboundTransfersController
])

function InboundTransfersController($scope, $location, LCB, CloudMachine, _) {
    var vm = this;
    var users = CloudMachine.users()
    users.$loaded().then(init)
    var me = {}
    var raw = {}
    var formatted = {}
    // var manifests = []
    function formatInventoryTransferInbound(inbound_transfers) {
        // console.log(inbound_transfers);
        me = _.find(users, {username: sessionStorage.username})

        var typemap = gettypemap()
        inbound_transfers.map(function(inbound_item){
            inbound_item.from = _.find(me.raw.vendor, {location: inbound_item.outbound_license}).name
            inbound_item.inventorytypelabel = typemap[inbound_item.inventorytype].label
            inbound_item.datestring = getdatestringfor(inbound_item.sessiontime)
            inbound_item.datetimestring = gettimestring(inbound_item.sessiontime)
            inbound_item.label =  '['+inbound_item.inventoryid+'] ' + parseFloat(inbound_item.quantity).toFixed(2) + ' x ' + inbound_item.strain + ' ' + inbound_item.inventorytypelabel + ' ($'+ inbound_item.price +')'
        })
        sortbykey(inbound_transfers, 'sessiontime');

        // localStorage.setItem('inbound_transfers', JSON.stringify(inbound_transfers));
        return inbound_transfers
    }
    function init() {
        // console.log(users);
        me = _.find(users, {username: sessionStorage.username})
        // console.log(me);
        // var  = aggregatemanifests(me.raw.manifest, me.raw.manifest_stop_data, me.raw.manifest_stop_items)
        // formatted.manifests = formatManifests(me.raw.manifest, me.raw.manifest_stop_data, me.raw.manifest_stop_items, me.raw.inventory_transfer)
        // $scope.manifests = formatted.manifests
        // console.log(formatted.manifests)
        $scope.inbound_transfers = formatInventoryTransferInbound(me.raw.inventory_transfer_inbound)
        console.log($scope.inbound_transfers);
        // console.log(aggmanfiests);
    }
    function getdatestringfor (unixtime) {
        // console.log(unixtime);
        return new Date(unixtime * 1000).toLocaleDateString();
        // return unixtime *
    }
    function gettimestring (unixtime) {
        // console.log(unixtime);
        return new Date(unixtime * 1000).toLocaleString();
        // return unixtime *
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
          22: {label: 'Solid Marijuana Infused Edible', weighable: false},
          23: {label: 'Liquid Marijuana Infused Edible', weighable: false},
          24: {label: 'Marijuana Extract for Inhalation', weighable: false},
          25: {label: 'Marijuana Infused Topicals', weighable: false},
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
}

})();
