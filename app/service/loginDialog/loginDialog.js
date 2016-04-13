(function () {
    angular.module('app').factory('loginDialog', loginDialog);
    /* @ng-inject */
    function loginDialog($mdDialog, $mdMedia) {
        return ()=> {
            return $mdDialog.show({
                controller: LoginController,
                templateUrl: '/service/loginDialog/loginDialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: $mdMedia('xs')
            });
        };
    }

    /* @ng-inject */
    function LoginController($scope, rootUser, $mdDialog, alert, $ajax, contentFactory, Chat, Alarm) {
        $scope.user = rootUser;
        $scope.cancel = $mdDialog.cancel;
        $scope.login = user => {
            $ajax.post('/api/v1/user/login', user).then(response=> {
                rootUser.setProperties(response.result, contentFactory, Chat, Alarm);
                alert("로그인 되었습니다.");
                $mdDialog.hide();
            });
        };
    }
})();