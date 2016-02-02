
(function(){
    angular
    .module('countryApp')
    .factory('LCB', ['$http',
    LCB
])

function LCB($http) {
    var lcb = {
        post: post,
        fail: fail,
    }
    function fail (res) {
        console.log('FAILURE! ' + res.error);
    }
    function post(req, fail, succeed) {
        if (sessionStorage.sessionid) req.sessionid = sessionStorage.sessionid
        req["API"] = "4.0";
        console.log('post!:');
        console.log(req);
        $http({
            method: 'POST',
            url: 'LCB/postWrapper',
            data: req,
            datatype: 'json',
        }).success(function (res) {
            console.log(res);
            if (res.success == 1) {
                succeed(res);
            } else {
                fail(res);
            };
        });
    }

    return lcb
};

})();
