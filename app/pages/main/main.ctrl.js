(function () {
    angular.module('app').controller('mainCtrl', mainCtrl);
    /* @ng-inject */
    function mainCtrl($ajax) {
        var self = this;
        this.message = '';
        self.count = {male:0, female:0};

        $ajax.get('/api/v1/user/count').then(response=> {
            self.count = response.result;
        });
    }
})();