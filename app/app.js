var countryApp = angular.module('countryApp', [
  'ngRoute',
  'ngMaterial',
  'angular-loading-bar',
  'firebase',
  'underscore',
]);

countryApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'Landing/Landing.html',
      controller: 'LandingController',
      controllerAs: 'vm'
    })
    .when('/market', {
      templateUrl: 'Market/Market.html',
      controller: 'MarketController',
      controllerAs: 'vm'
    })
    .when('/bids', {
      templateUrl: 'Bids/Bids.html',
      controller: 'BidsController',
      controllerAs: 'vm'
    })
    .when('/bids/create/:id', {
      templateUrl: 'Bids/Create-Bid.html',
      controller: 'CreateBidController',
      controllerAs: 'vm'
    })
    .when('/auctions', {
      templateUrl: 'Auctions/Auctions.html',
      controller: 'AuctionsController',
      controllerAs: 'vm',
      resolve: {
          InventoryItems: function(Inventory) {
              return Inventory.refresh()
          }
      }
    })
    .when('/auctions/create/:id', {
      templateUrl: 'Auctions/CreateAuction.html',
      controller: 'CreateAuctionController',
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
