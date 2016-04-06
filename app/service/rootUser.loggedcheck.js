(function () {
    angular.module('app').run(LoggedCheck);
    /* @ng-inject */
    function LoggedCheck(rootUser, $ajax) {
        $ajax.get('/api/v1/user').then(function (result) {
            var user = result.result;
            if (!user) {
                return;
            }
            rootUser.setProperties(user);
        });
    }
})();