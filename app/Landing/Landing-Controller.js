
(function(){
  angular
    .module('countryApp')
    .controller('LandingController', ['$location', 'LCB',
      LandingController
    ])

  function LandingController($location, LCB) {
    var vm = this;
    vm.formData = {action: 'login'}
    vm.signIn = signIn;

    var llogin = {action: 'login', username: 'luchinisupercritical@gmail.com', password: '44Million!', license_number:'603347225'}
    function signIn () {
        console.log('Sign In!');
        LCB.post(llogin, fail, succeed)
        // LCB.post(vm.formData, fail, succeed)
    }
    function succeed (res) {
        sessionStorage.sessionid = res.sessionid
        // FOR DEV
        sessionStorage.ubi = llogin.license_number
        console.log(sessionStorage.ubi);
        // sessionStorage.user = {ubi: vm.formData.license_number}
        $location.path('/market')
    }
    function fail (res) {
        vm.error = res.error
    }
  };

})();
