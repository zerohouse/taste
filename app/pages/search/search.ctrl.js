(function () {
    angular.module('app').controller('searchCtrl', searchCtrl);
    /* @ng-inject */
    function searchCtrl($scope, $timeout, contentFactory, Defaults, $state, $q) {
        var self = this;
        this.keyword = '';
        this.contents = Defaults[$state.current.name];

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