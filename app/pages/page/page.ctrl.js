(function () {
    angular.module('app').controller('pageCtrl', pageCtrl);
    /* @ng-inject */
    function pageCtrl($ajax, $stateParams, contentFactory) {
        var self = this;
        $ajax.get('/api/v1/user', {email: $stateParams.email}).then(function (response) {
            self.user = response.result;

            self.user.contents = self.user.contents.map(content=> {
                return contentFactory.getNew(content);
            });
        });
    }
})();