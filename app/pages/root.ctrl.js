(function () {
    angular.module('app').controller('rootController', rootController);
    /* @ng-inject */
    function rootController(rootUser, $mdSidenav, loginDialog, registerDialog, $state, $window, $ajax, confirm) {
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
            $window.open(link, '_blank');
            if (event)
                event.stopPropagation();
        };

        this.logout = function () {
            confirm("로그아웃 하시겠습니까?").then(()=> {
                $ajax.post('/api/v1/user/logout').then(function () {
                    rootUser.logout();
                });
            });
        };

        this.hasNewAlarm = function () {
            return rootUser.alarms.find(alarm=> {
                return !alarm.check;
            });
        };
    }

})();