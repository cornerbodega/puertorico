(function(){
    angular
    .module('countryApp')
    .directive('myDateTimeSelector', ['$sce', function ($sce) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    console.log('Error! No ngModel!');
                    return;
                }
                element.datetimepicker();
                element.on('blur', function () {
                    scope.dateTime = new Date(element.data("DateTimePicker").date().format());
                    console.log(scope.dateTime);
                    ngModel.$setViewValue(scope.dateTime);
                    scope.$digest();
                });

                console.log('mydatetimeselector!!');

            }
        }
    }])
    .directive('sellerStatusAction', function ($compile, CloudMachine, $location, Auction) {
        return {
            restrict: 'E',
            // scope: {
            //     // auction: '='
            // },
            templateUrl: 'Auctions/Item-Detail/views/seller-actions.html',
            link: function (scope, element, attrs) {
                console.log(scope.auction);
                var status = scope.auction.status
                var AS = window.AUCTION_STATUS
                console.log(AS);
                console.log(status);
                scope.generateManifest = generateManifest;
                scope.sellerConfirm = sellerConfirm;
                if (status === AS.FOR_SALE) {
                    console.log('FOR SALE!!');
                    scope.forsale = true
                }
                if (status === AS.RESERVED) {
                    console.log('RESERVED!!');
                    scope.reserved = true
                    //need to get the SELLER to GIVE ME INFORMATION here
                    //going to need to bust out some form inputs and everything...
                }
                function sellerConfirm(){
                    console.log('confirm!!');
                    scope.showManifestInfo=true
                }
                function generateManifest(){
                    console.log('manifest!!');
                    console.log(scope.manifestDateTime);
                    if (!scope.manifestDateTime) return  vm.error = "Please select the approximate date and time for delivery."
                    if (!scope.manifestDateTime || scope.manifestDateTime.length < 1) return vm.error = "Please select the approximate date and time for delivery."
                }



            }
        }
    })
    .directive('auctionItemDetailCard', function ($compile, CloudMachine, $location, Auction) {
        return {
            restrict: 'E',
            scope: {
                auction: '='
            },
            templateUrl: 'Auctions/Item-Detail/views/auction-item-detail-card.html',
            link: function (scope, element, attrs) {
                console.log(scope.auction);

                scope.back = function back() {
                    $location.path(window.PATHS.INVENTORY)
                }
                // CloudMachine.auctionsRef()[auction.key].active = false
                // console.log(auction.key);
                // console.log(auction);

            }
        }
    })
    // .directive('marketItemDetailCard', function ($compile, CloudMachine, $location, Auction) {
    //     return {
    //         restrict: 'E',
    //         scope: {
    //             auction: '='
    //         },
    //         templateUrl: 'Market/Item-Detail/market-item-detail-card.html',
    //         link: function (scope, element, attrs) {
    //
    //             scope.buy = function buy(auction) {
    //                 scope.auction = auction
    //                 // https://mandrillapp.com/api/1.0/
    //                 console.log('Buy!!');
    //                 console.log(auction);
    //
    //                 // scope.auction = Auction.auction
    //                 scope.auction.buyer = sessionStorage.ubi
    //                 // TEXT MESSAGE!
    //                 // CloudMachine.ChimpMachine().buy(auction)
    //
    //                 // console.log(Auction.auction);
    //                 var auctions = CloudMachine.auctionsRef()
    //                 auctions.$loaded().then(function(){
    //                     auctions[scope.auction.key].buyer = scope.auction.buyer
    //                     auctions[scope.auction.key].active = false
    //                     auctions[scope.auction.key].status = window.AUCTION_STATUS.RESERVED
    //
    //                     auctions.$save().then(function(){
    //                         // $location.path(PATHS.BIDS)
    //                         // console.log('saved!!');
    //                     })
    //                     // auctions.$bindTo(scope, 'auctions').then(function(){
    //                     //     auctions[scope.auction.key].buyer = Auction.auction.buyer
    //                     //     // auctions[scope.auction.key].active = false
    //                     //     console.log(auctions[scope.auction.key]);
    //                     //     $location.path(PATHS.BIDS)
    //                     // })
    //                 })
    //                 // $location.path(PATHS.ITEM_DETAIL+'/'+auction.item.id)
    //
    //             }
    //             scope.cancel = function cancel() {
    //                 $location.path(PATHS.MARKET)
    //             }
    //             // CloudMachine.auctionsRef()[auction.key].active = false
    //             // console.log(auction.key);
    //             // console.log(auction);
    //
    //         }
    //     }
    // })
    .directive('marketCard', function ($compile, CloudMachine, $location, Auction, $firebaseObject) {
        return {
            restrict: 'E',
            scope: {
                auction: '='
            },
            templateUrl: 'Market/templates/market-card.html',
            link: function (scope, element, attrs) {
                console.log(scope.auction);
                scope.buy = function buy(auction) {
                    // https://mandrillapp.com/api/1.0/
                    // console.log('Buy!!');
                    console.log(auction);
                    // scope.auction = Auction.auction
                    scope.auction.buyer = sessionStorage.ubi
                    // TEXT MESSAGE!
                    // CloudMachine.ChimpMachine().buy(Auction.auction)
                    // socket.emit('auction', auction);

                    // console.log(Auction.auction);
                    var auctions = CloudMachine.auctionsRef()
                    var rootRef = new Firebase("https://potnet.firebaseio.com")
                    var a = $firebaseObject(rootRef.child('auctions/'+scope.auction.key))
                    // var a = auctions.child(scope.auction.key)
                    console.log(a);
                    // console.log(a.$loaded());
                    a.$loaded().then(function(){
                        // a.buyer = scope.auction.buyer
                        // a.active = false
                        // a.status = window.AUCTION_STATUS.RESERVED
                        a.$save().then(function(){
                            // $location.path(PATHS.BUY_INFO)
                            scope.when = true
                        })
                    })
                    // auctions.$loaded().then(function(){
                    //     auctions[scope.auction.key].buyer = scope.auction.buyer
                    //     auctions[scope.auction.key].active = false
                    //     auctions[scope.auction.key].status = window.AUCTION_STATUS.RESERVED
                    //
                    //     // auctions.$save().then(function(){
                    //         // $location.path(PATHS.BIDS)
                    //         // console.log('saved!!');
                    //     // })
                    //     // auctions.$bindTo(scope, 'auctions').then(function(){
                    //     //     auctions[scope.auction.key].buyer = Auction.auction.buyer
                    //     //     // auctions[scope.auction.key].active = false
                    //     //     console.log(auctions[scope.auction.key]);
                    //     //     $location.path(PATHS.BIDS)
                    //     // })
                    // })
                    // $location.path(PATHS.ITEM_DETAIL+'/'+auction.item.id)

                }
                // scope.back = function cancel() {
                //     $location.path(PATHS.MARKET)
                // }
                // CloudMachine.auctionsRef()[auction.key].active = false
                // console.log(auction.key);
                // console.log(auction);


            }
        }
    })
})();
