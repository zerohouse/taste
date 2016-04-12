(function () {
    angular.module('app').controller('searchCtrl', searchCtrl);
    /* @ng-inject */
    function searchCtrl($scope, $timeout, contentFactory, Defaults, $state, $q) {
        var self = this;
        this.keyword = '';
        this.contents = Defaults[$state.current.name];


        // $scope.$watch(()=> {
        //     return this.keyword;
        // }, keyword=> {
        //     $timeout.cancel(ajax);
        //     if (!keyword) {
        //         self.contents = Defaults[$state.current.name];
        //         return;
        //     }
        //     ajax = $timeout(function () {
        //         contentFactory.search($state.current.name, keyword).then(function (results) {
        //             self.contents = results;
        //         });
        //     }, 300);
        // });

        this.search = function (keyword) {
            if (!keyword) {
                this.contents = Defaults[$state.current.name];
                return;
            }
            contentFactory.search($state.current.name, keyword).then(function (results) {
                self.contents = results;
            });
        };

        this.querySearch = (keyword)=> {
            if (!keyword)
                return $q(resolve=> {
                    resolve([]);
                });
            if ($state.current.name === 'movie') {
                return contentFactory.searchMovieText(keyword);
            }
            return contentFactory.search($state.current.name, keyword);
        };

    }
})();