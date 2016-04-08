(function () {
    angular.module('app').controller('movieCtrl', movieCtrl);
    /* @ng-inject */
    function movieCtrl($ajax, $scope, $timeout, Movie) {
        var ajax, self = this;
        this.keyword = '';

        var defaults;
        $ajax.get('/resources/data/movies.json').then(movies=> {
            defaults = this.movies = movies.map(movie=> {
                return new Movie(movie);
            });
        });

        $scope.$watch(()=> {
            return this.keyword;
        }, keyword=> {
            $timeout.cancel(ajax);
            if (!keyword) {
                this.movies = defaults;
                return;
            }
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
            });
        }

        this.more = ()=> {
            this.movieLength += 10;
        };
    }
})();