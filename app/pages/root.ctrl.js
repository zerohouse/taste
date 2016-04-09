(function () {
    angular.module('app').controller('rootController', rootController);
    /* @ng-inject */
    function rootController(rootUser, $mdSidenav, loginDialog, registerDialog, $state, $window, $ajax) {
        this.user = rootUser;
        this.openSide = ()=> {
            $mdSidenav('nav').toggle();
        };
        this.login = ()=> {
            loginDialog();
        };

        this.register = ()=> {
            registerDialog();
        };

        this.state = $state;

        this.go = (state)=> {
            $state.go(state);
            $mdSidenav('nav').toggle();
        };

        this.openNewTab = function (link, event) {
            event.stopPropagation();
            $window.open(link, '_blank');
        };

        this.logout = function () {
            $ajax.post('/api/v1/user/logout').then(function () {
                rootUser.logout();
            });
        };
    }

})();