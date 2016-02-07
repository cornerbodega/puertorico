
(function(){
    angular
    .module('countryApp')
    .controller('LandingController', ['$location', 'LCB', 'CloudMachine', '_',
    LandingController
])

function LandingController($location, LCB, CloudMachine, _) {
    var vm = this;
    vm.userData = {}
    vm.formData = {action: 'login'}
    vm.signIn = signIn;
    vm.new_user = false
    var llogin = {action: 'login', username: 'luchinisupercritical@gmail.com', password: '44Million!'}
    // var llogin = {action: 'login', username: 'luchinisupercritical@gmail.com', password: '44Million!', license_number:'603347225'}
    // vm.formData.username = llogin.username
    // vm.formData.password = llogin.password
    // vm.formData.license_number = '603347225'
    // vm.formData.phone = '6178756637'


    function newUser() {
        console.log('WOO NEW USER!');
        vm.new_user = true
        vm.show_phone = true
        vm.show_ubi = true

        ///!!!!!!

    }

    function signIn () {
        // sessionStorage.ubi = llogin.license_number
        // var ubi = sessionStorage.ubi
        var ubi = vm.formData.license_number
        sessionStorage.ubi = ubi
        console.log(vm.formData);
        var users = CloudMachine.users()
        users.$loaded().then(function(){
            var existing = _.find(users, {username: vm.formData.username})
            console.log(existing);
            if (existing) {
                console.log('existing!!');
// luchinisupercritical@gmail.com
// 44Million!
                sessionStorage.ubi = existing.ubi
                sessionStorage.username = existing.username
                sessionStorage.phone = existing.phone
                var req = { action: 'login', username: existing.username, password: vm.formData.password, license_number: existing.ubi}
                LCB.post(req, fail, existingUserLoginSucceed)
            } else {
                newUser()
                if (!vm.formData.phone) return vm.error= "Please enter a valid phone number."
                if (!vm.formData.license_number) return vm.error= "Please enter a valid UBI."
                LCB.post(vm.formData, fail, newUserSucceed)
            }
            // console.log(existing);
            // if (!users[ubi])  newUser()
            // find by email
            // return _.filter($scope.auctions, {buyer: sessionStorage.ubi})
            // vm.formData.license_number = '603347225'
            // llogin.license_number = ubi
            // console.log(ubi);

            // if(ubi) { }

            // LCB.post(vm.formData, fail, succeed)
        })

    }
    function existingUserLoginSucceed(res) {
        sessionStorage.sessionid = res.sessionid
        $location.path(PATHS.AUCTIONS)
    }
    function newUserSucceed (res) {
        sessionStorage.sessionid = res.sessionid
        var ubi = sessionStorage.ubi
        var users = CloudMachine.users()

        users.$loaded().then(function(){
            if (vm.new_user) {
                CloudMachine.UserMachine().createUser({
                    ubi: ubi,
                    username: vm.formData.username,
                    phone: vm.formData.phone
                }) // do a separate query to ascertain the license type!
                .then(function userCreated(res) {
                    console.log('user created:');
                    console.log(res);
                    vm.signIn()
                    // $location.path(PATHS.AUCTIONS)
                })
            }
        })

    }
    function fail (res) {
        vm.error = res.error
    }
};

})();
