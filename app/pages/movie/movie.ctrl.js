(function () {
    angular.module('app').controller('movieCtrl', movieCtrl);
    /* @ng-inject */
    function movieCtrl($ajax, $scope, $timeout, Movie) {
        var ajax, self = this;
        this.keyword = '';

        $scope.$watch(()=> {
            return this.keyword
        }, keyword=> {
            if (!keyword)
                return;
            $timeout.cancel(ajax);
            ajax = $timeout(function () {
                getMovies(keyword);
            }, 300);
        });


        function getMovies(keyword) {
            $ajax.get('/api/v1/search/movie', {query: keyword}).then(response=> {
                self.movies = response.result.map(movie=> {
                    return new Movie(movie);
                });
                self.movieLength = 10;
            })
        }

        this.more = ()=> {
            this.movieLength += 10;
        };
    }
})();