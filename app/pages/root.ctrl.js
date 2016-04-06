(function () {
    angular.module('app').controller('rootController', rootController);
    /* @ng-inject */
    function rootController(rootUser,  $mdSidenav, loginDialog, registerDialog) {
        this.user = rootUser;
        this.openSide = ()=>{
            $mdSidenav('nav').toggle();
        };
        this.login = ()=>{
            loginDialog();
        };

        this.register = ()=>{
            registerDialog();
        };
    }

})();