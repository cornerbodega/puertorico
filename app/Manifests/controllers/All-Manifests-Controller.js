
(function(){
    angular
    .module('countryApp')
    .controller('ManifestsController', ['$scope','$location', 'LCB', 'CloudMachine', '_',
    ManifestsController
])

function ManifestsController($scope, $location, LCB, CloudMachine, _) {
    var vm = this;
    var users = CloudMachine.users()
    users.$loaded().then(init)
    var me = {}
    var raw = {}
    var formatted = {}
    // var manifests = []
    function init() {
        // console.log(users);
        me = _.find(users, {username: sessionStorage.username})
        if (!me) return $location.path(window.PATHS.LANDING);
        // console.log(me);
        // var  = aggregatemanifests(me.raw.manifest, me.raw.manifest_stop_data, me.raw.manifest_stop_items)
        formatted.manifests = formatManifests(me.raw.manifest, me.raw.manifest_stop_data, me.raw.manifest_stop_items, me.raw.inventory_transfer)
        $scope.manifests = formatted.manifests
        console.log(formatted.manifests)
        // console.log(aggmanfiests);
    }
    function formatInventoryTransferInbound(inbound_transfers) {
        // console.log(inbound_transfers);
        var typemap = gettypemap()
        inbound_transfers.map(function(inbound_item){
            inbound_item.inventorytypelabel = typemap[inbound_item.inventorytype].label
            inbound_item.datestring = getdatestringfor(inbound_item.sessiontime)
            inbound_item.datetimestring = gettimestring(inbound_item.sessiontime)
            inbound_item.label =  '['+inbound_item.inventoryid+'] ' + parseFloat(inbound_item.quantity).toFixed(2) + ' x ' + inbound_item.strain + ' ' + inbound_item.inventorytypelabel + ' ($'+ inbound_item.price +')'
        })
        sortbykey(inbound_transfers, 'sessiontime');

        // localStorage.setItem('inbound_transfers', JSON.stringify(inbound_transfers));
        return inbound_transfers
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
    function formatManifests(mans, stops, items, transfers) {
        // console.log("lets format those manifests!");
        var manifests = aggregatemanifests(mans, stops, items)
        // console.log(transfers);
        manifests.map( function (fest) {
            fest.totalprice = 0;
            transfers.map( function (fer) {
                if (fest.manifestid === fer.manifestid) {
                    fest.transferred = true
                    if (typeof fest.transfers === 'undefined') {
                        fest.transfers = [];
                    }
                    fest.transfers.push(fer)
                    fest.totalprice += parseInt(fer.price)
                    fest.stops.map( function (stop) {
                        if (!stop.stop_total_price) stop.stop_total_price = 0
                        // console.log(stop.stop_total_price   + ' 1stop.stop_total_price')
                        stop.items.map(function (item) {
                            // if(!stop.stop_total_price) stop.stop_total_price = 0
                            // stop.stop_total_price += parseFloat(item.price).toFixed(2)
                            if (item.inventoryid === fer.inventoryid) {
                                if (Math.round(fer.price) != fer.price) {
                                    fer.price = parseFloat(fer.price).toFixed(2);
                                }
                                item.price = parseFloat(fer.price).toFixed(2);
                                stop.stop_total_price = parseFloat(stop.stop_total_price) + parseFloat(item.price)
                                var ppu = parseFloat(fer.price) / parseInt(item.quantity)
                                if (Math.round(ppu) != ppu) {
                                    ppu = ppu.toFixed(2);
                                }
                                item.priceperunit = '$' + ppu
                                item.price = '$' + item.price;
                                // console.log(stop.stop_total_price   + ' 2stop.stop_total_price')

                            }
                        })
                    })
                }
            })
            fest.label += ''
            fest.label += ' ($' + fest.totalprice + ')'
            if (!fest.transferred) fest.label = '[Not Transferred] ' + fest.label
        })
        manifests.map(function(manifest){
            var a = getdatestringfor(manifest.sessiontime)
            // console.log(a);
            var b = a.split('/')
            manifest.category =  b[0]  +'/' +  b[2]
            // console.log(a + ' ' + b + ' ' + manifest.category);
            // console.log(new Date(manifest.sessiontime).getMonth())
            // manifest.category =
        })
        sortbykey(manifests, 'sessiontime');

        // localStorage.setItem('manifests', JSON.stringify(manifests));
        return manifests
    }
    function sortbykey(array, key) {
      return array.sort(function(a, b) {
          var x = a[key]; var y = b[key];
          return ((x < y) ? 1 : ((x > y) ? -1 : 0));
      });
  }

    function aggregatemanifests (mans, stops, items) {
        var aggmanifests = []
        var manifest = mans
        var manifest_stop_data = stops
        var manifest_stop_items = items
        aggmanifests = angular.copy(manifest);
        aggmanifests.map (function (agg) {
            agg.stops = [];
            manifest_stop_data.map(function (stopdata) {
                if (typeof stopdata.items === 'undefined') {
                    //stopdata.items = [];
                }
                if (agg.manifestid === stopdata.manifestid) {
                    agg.stops.push(stopdata);
                }
            })

            manifest_stop_items.map(function (stopitem) {
                if (stopitem.manifestid === agg.manifestid) {
                    agg.stops.map (function (stop) {
                        if (stop.manifestid === stopitem.manifestid) {
                            if (stop.stopnumber === stopitem.stopnumber) {
                                if (typeof stop.items === 'undefined') {
                                    stop.items = [];
                                }
                                stop.items.push(stopitem);
                            }
                        }
                    })
                }
            })
        })
        aggmanifests.map(function (m) {
            m.label = '[' + m.manifestid + ']' + ' ';
            // m.label +=
            m.label += gettimestring(m.completion_date)
            m.dateLabel = gettimestring(m.completion_date)
            if (m.stopcount === 1) {
                m.label += ' ' + ' to '+ m.stops[0].name
            }
        })
        return aggmanifests;
    }
    // function format(raw) {
    //
    //     // SMART ITEMS!!!
    //     // _.each(raw.manifest, function eachManifest(manifest) {
    //     //     _.each(raw.manifest_stop_data, function eachStop(stop) {
    //     //         if (stop.manifestid != manifest.manifestid) return
    //     //         _.each(raw.manifest_stop_items, function eachManifestedItem(manifestedItem){
    //     //             if (manifestedItem.manifestid != manifest.manifestid) return
    //     //             _.each(raw.inventory_transfer, function eachTransfteredItem(transferedItem){
    //     //                 if (transferedItem.inventoryid != manifestedItem.inventoryid) return
    //     //                 // console.log(transferedItem);
    //     //                 var formatted = angular.copy(transferedItem)
    //     //                 formatted.manifest = manifest
    //     //                 formatted.stop = stop
    //     //                 console.log(formatted);
    //     //             })
    //     //         })
    //     //     })
    //     // })
    //     // SMART MANIFESTS !! (only transferred!!)
    //     // _.each(raw.manifest, function eachManifest(manifest) {
    //     //     _.each(raw.manifest_stop_data, function eachStop(stop) {
    //     //         if (stop.manifestid != manifest.manifestid) return
    //     //         _.each(raw.manifest_stop_items, function eachManifestedItem(manifestedItem){
    //     //             if (manifestedItem.manifestid != manifest.manifestid) return
    //     //             _.each(raw.inventory_transfer, function eachTransfteredItem(transferedItem){
    //     //                 if (transferedItem.inventoryid != manifestedItem.inventoryid) return
    //     //                 // console.log(transferedItem);
    //     //                 var formatted = angular.copy(manifest)
    //     //                 if
    //     //                 if(!formatted.stops) formatted.stops = []
    //     //                 formatted.stops.push(stop)
    //     //                 // formatted.stop.push(stop)
    //     //
    //     //                 console.log(formatted);
    //     //             })
    //     //         })
    //     //     })
    //     // })
    // }
};

})();
