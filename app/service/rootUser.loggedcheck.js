(function () {
    angular.module('app').run(LoggedCheck);
    /* @ng-inject */
    function LoggedCheck(rootUser, $ajax, contentFactory, Chat) {
        $ajax.get('/api/v1/user').then(function (response) {
            rootUser.setProperties(response.result, contentFactory, Chat);
        });
    }
})();