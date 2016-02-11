var countryApp = angular.module('countryApp', [
  'ngRoute',
  'ngMaterial',
  'angular-loading-bar',
  'firebase',
  'underscore',
  // 'md.data.table',
  'ng-uploadcare',
  // 'ui.bootstrap',

]);

countryApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'Landing/Landing.html',
      controller: 'LandingController',
      controllerAs: 'vm'
    })
    .when(window.PATHS.MARKET, {
      templateUrl: 'Market/Market.html',
      controller: 'MarketController',
      controllerAs: 'vm'
    })
    .when(window.PATHS.BIDS, {
      templateUrl: 'Bids/Bids.html',
      controller: 'BidsController',
      controllerAs: 'vm'
    })
    .when(window.PATHS.INVENTORY, {
      templateUrl: 'Auctions/Auctions.html',
      controller: 'AuctionsController',
      controllerAs: 'vm',
    //   resolve: {
    //       InventoryItems: function(Inventory) {
    //           return Inventory.refresh()
    //       }
    //   }
    // resolve: {
    //     Users: function(CloudMachine) {
    //         return CloudMachine.users()
    //     }
    // }
    })
    .when('/manifests/', {
      templateUrl: 'Manifests/views/All-Manifests.html',
      controller: 'ManifestsController',
      controllerAs: 'vm'
    })
    .when('/inbound_transfers/', {
      templateUrl: 'Manifests/views/Inbound-Transfers.html',
      controller: 'InboundTransfersController',
      controllerAs: 'vm'
    })
    .when('/auctions/create/:id', {
      templateUrl: 'Auctions/CreateAuction.html',
      controller: 'CreateAuctionController',
      controllerAs: 'vm'
    })
    .when('/inventory/detail/:id', {
      templateUrl: 'Auctions/Item-Detail/views/Auction-Item-Detail.html',
      controller: 'AuctionItemDetailController',
      controllerAs: 'vm'
    })
    .when('/market/item/:id', {
      templateUrl: 'Market/Item-Detail/item-detail.html',
      controller: 'ItemDetailController',
      controllerAs: 'vm'
    })
    .when('/market/orders/', {
      templateUrl: 'Orders/views/Orders.html',
      controller: 'OrdersController',
      controllerAs: 'vm'
    })
    .when('/market/orders/item/:id', {
      templateUrl: 'Orders/views/Order-Detail.html',
      controller: 'OrderDetailController',
      controllerAs: 'vm'
    })
    // when('/:countryId', {
    //   templateUrl: 'country-detail.html',
    //   controller: 'CountryDetailCtrl'
    // }).
    .otherwise({
      redirectTo: '/'
    });
});
