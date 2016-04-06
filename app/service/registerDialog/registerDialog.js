(function () {
    angular.module('app').factory('registerDialog', registerDialog);
    /* @ng-inject */
    function registerDialog($mdDialog, $mdMedia) {
        return ()=> {
            return $mdDialog.show({
                controller: RegisterController,
                templateUrl: '/service/registerDialog/registerDialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: $mdMedia('xs')
            })
        };
    }

    /* @ng-inject */
    function RegisterController($scope, rootUser, $mdDialog, $ajax, alert) {
        $scope.user = rootUser;
        $scope.cancel = $mdDialog.cancel;
        $scope.register = user => {
            $ajax.post('/api/v1/user', user).then(userDto=> {
                rootUser.setProperties(userDto);
                alert("회원가입이 완료되었습니다.");
                $mdDialog.hide();
            });
        }
    }
})();