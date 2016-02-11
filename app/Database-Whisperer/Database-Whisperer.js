
(function(){
    angular
    .module('countryApp')
    .factory('DatabaseWhisperer', [ '$http',
    DatabaseWhisperer
])

function DatabaseWhisperer($http) {

    var _databaseWhisperer = {
        refreshLCB: refreshLCB,
    }

    function refreshLCB() {
        return $http({
            method: 'POST',
            url: '/LCB/syncCheck',
            data: { sessionid: sessionStorage.sessionid },
            datatype: 'json',
        }).success(function (res) {
            console.log(res);
            // save to mongo
        });
    }
    console.log('DatabaseWhisperer!');

    return _databaseWhisperer
};

})();
