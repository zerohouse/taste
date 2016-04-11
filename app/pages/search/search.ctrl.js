(function () {
    angular.module('app').controller('searchCtrl', searchCtrl);
    /* @ng-inject */
    function searchCtrl($scope, $timeout, contentFactory, Defaults, $state) {
        var ajax, self = this;
        this.keyword = '';
        this.contents = Defaults[$state.current.name];


        $scope.$watch(()=> {
            return this.keyword;
        }, keyword=> {
            $timeout.cancel(ajax);
            if (!keyword) {
                self.contents = Defaults[$state.current.name];
                return;
            }
            ajax = $timeout(function () {
                contentFactory.search($state.current.name, keyword).then(function (results) {
                    self.contents = results;
                });
            }, 300);
        });

    }
})();