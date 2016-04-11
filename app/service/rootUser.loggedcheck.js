(function () {
    angular.module('app').run(LoggedCheck);
    /* @ng-inject */
    function LoggedCheck(rootUser, $ajax, contentFactory) {
        $ajax.get('/api/v1/user').then(function (result) {
            var user = result.result;
            if (!user) {
                return;
            }
            user.contents = user.contents.map(content=> {
                return contentFactory.getNew(content);
            });
            rootUser.setProperties(user);
        });
    }
})();