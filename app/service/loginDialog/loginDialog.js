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
    function LoginController($scope, rootUser, $mdDialog, alert, $ajax, Music, Book, Movie) {
        $scope.user = rootUser;
        $scope.cancel = $mdDialog.cancel;
        $scope.login = user => {
            $ajax.post('/api/v1/user/login', user).then(response=> {
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
                alert("로그인 되었습니다.");
                $mdDialog.hide();
            });
        };
    }
})();