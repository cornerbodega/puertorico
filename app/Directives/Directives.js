(function(){
    angular
    .module('countryApp')
    .directive('sellerStatusAction', function ($compile, CloudMachine, $location, Auction) {
        return {
            restrict: 'E',
            scope: {
                auction: '='
            },
            templateUrl: 'Auctions/Item-Detail/views/seller-actions.html',
            link: function (scope, element, attrs) {
                console.log(scope.auction);
                var status = scope.auction.status
                var AS = window.AUCTION_STATUS
                console.log(AS);
                console.log(status);

                if (status.label === AS.FOR_SALE.label) {
                    console.log('FOR SALE!!');
                    scope.forsale = true
                }
                if (status.label === AS.RESERVED) {
                    console.log('RESERVED!!');
                    scope.reserved = true
                    //need to get the SELLER to GIVE ME INFORMATION here
                    //going to need to bust out some form inputs and everything...
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
                scope.buy = function buy(auction) {
                    // https://mandrillapp.com/api/1.0/
                    console.log('Buy!!');
                    // console.log(auction);
                    // scope.auction = Auction.auction
                    scope.auction.buyer = sessionStorage.ubi
                    CloudMachine.ChimpMachine().buy(Auction.auction)
                    // console.log(Auction.auction);
                    var auctions = CloudMachine.auctionsRef()
                    auctions.$loaded().then(function(){
                        auctions[scope.auction.key].buyer = scope.auction.buyer
                        auctions[scope.auction.key].active = false
                        auctions[scope.auction.key].status = 'RESERVED'
                        // auctions.$save().then(function(){
                                // $location.path(PATHS.BIDS)
                            // console.log('saved!!');
                        // })
                        // auctions.$bindTo(scope, 'auctions').then(function(){
                        //     auctions[scope.auction.key].buyer = Auction.auction.buyer
                        //     // auctions[scope.auction.key].active = false
                        //     console.log(auctions[scope.auction.key]);
                        //     $location.path(PATHS.BIDS)
                        // })
                    })
                    // $location.path(PATHS.ITEM_DETAIL+'/'+auction.item.id)

                }
                scope.back = function back() {
                    $location.path(window.PATHS.INVENTORY)
                }
                // CloudMachine.auctionsRef()[auction.key].active = false
                // console.log(auction.key);
                // console.log(auction);

            }
        }
    })
    .directive('marketItemDetailCard', function ($compile, CloudMachine, $location, Auction) {
        return {
            restrict: 'E',
            scope: {
                auction: '='
            },
            templateUrl: 'Market/Item-Detail/market-item-detail-card.html',
            link: function (scope, element, attrs) {
                console.log(scope.auction);
                scope.buy = function buy(auction) {
                    // https://mandrillapp.com/api/1.0/
                    console.log('Buy!!');
                    // console.log(auction);
                    // scope.auction = Auction.auction
                    scope.auction.buyer = sessionStorage.ubi
                    // TEXT MESSAGE!
                    CloudMachine.ChimpMachine().buy(Auction.auction)

                    // console.log(Auction.auction);
                    var auctions = CloudMachine.auctionsRef()
                    auctions.$loaded().then(function(){
                        auctions[scope.auction.key].buyer = scope.auction.buyer
                        auctions[scope.auction.key].active = false
                        auctions[scope.auction.key].status = window.AUCTION_STATUS.RESERVED

                        auctions.$save().then(function(){
                                // $location.path(PATHS.BIDS)
                            // console.log('saved!!');
                        })
                        // auctions.$bindTo(scope, 'auctions').then(function(){
                        //     auctions[scope.auction.key].buyer = Auction.auction.buyer
                        //     // auctions[scope.auction.key].active = false
                        //     console.log(auctions[scope.auction.key]);
                        //     $location.path(PATHS.BIDS)
                        // })
                    })
                    // $location.path(PATHS.ITEM_DETAIL+'/'+auction.item.id)

                }
                scope.cancel = function cancel() {
                    $location.path(PATHS.MARKET)
                }
                // CloudMachine.auctionsRef()[auction.key].active = false
                // console.log(auction.key);
                // console.log(auction);

            }
        }
    })
    .directive('marketCard', function ($compile, CloudMachine, $location, Auction) {
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
                    console.log('Buy!!');
                    console.log(auction);
                    // auction.buyer =
                    // prepare for Sale!
                    // hide price button and show confirm/ cancel
                    // SCHEDULE PICKUP!!
                    // Users have location
                    // Users have rating
                    // Auto generate manifest
                    // email manifest to registered email upon confirmation
                    // schedule transfer -> execute transfer automatically
                    // receive transfer on our app -> will sync with biotrack
                    // go crazy

                    Auction.auction = auction
                    // console.log(PATHS.ITEM_DETAIL +auction.item.id);
                    $location.path(window.PATHS.ITEM_DETAIL+auction.item.id)

                    // $location.path(PATHS.ITEM_DETAIL+'/'+auction.item.id)

                }
            }
        }
    })
})();
