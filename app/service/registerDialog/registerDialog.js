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
            });
        };
    }

    /* @ng-inject */
    function RegisterController($scope, rootUser, $mdDialog, $ajax, alert, Music, Book, Movie) {
        $scope.user = rootUser;
        $scope.cancel = $mdDialog.cancel;
        $scope.register = user => {
            $ajax.post('/api/v1/user', user).then(response=> {
                var user = response.result;
                user.contents = user.contents.map(content=> {
                    if (content.type === "SONG")
                        return new Music(content);
                    if (content.type === "ALBUM")
                        return new Music(content);
                    if (content.type === "ARTIST")
                        return new Music(content);
                    if (content.type === "BOOK")
                        return new Book(content);
                    if (content.type === "MOVIE")
                        return new Movie(content);
                });
                rootUser.setProperties(user);
                alert("회원가입이 완료되었습니다.");
                $mdDialog.hide();
            });
        };
    }
})();