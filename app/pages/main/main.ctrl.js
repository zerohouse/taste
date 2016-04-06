(function () {
    angular.module('app').controller('mainCtrl', mainController);
    /* @ng-inject */
    function mainController($ajax, $scope, $timeout, $window, alert, $hangul, rootUser, confirm, commentDialog) {
        var ajax, self = this;
        this.keyword = '';

        this.openCommentDialog = function (movie) {
            var detail = "";
            if (movie.directors && movie.directors[0]) {
                detail += "<strong>감독</strong> " + movie.directors.join(",");
            }
            if (movie.actors && movie.actors[0]) {
                detail += "<br><strong>출연</strong> " + movie.actors.join(",");
            }
            commentDialog(
                movie.title,
                detail,
                movie.link,
                movie.comment
            ).then(comment=> {
                var query = {};
                query.link = movie.link;
                query.comment = comment;
                $ajax.post('/api/v1/movie/update', query).then(()=> {
                    movie.comment = comment
                });
            });
        };

        this.addAndDetail = movie => {
            var finded = rootUser.movies.findBy('link', movie.link);
            if (!finded) {
                $ajax.post('/api/v1/movie', movie, true).then(resonpose=> {
                    rootUser.movies.push(resonpose.result);
                    alert($hangul.get_With_이가(movie.title.removeTags()) + " 콜렉션에 추가되었습니다.", document.querySelector('.movie-wrapper'));
                });
                return;
            }
            this.openCommentDialog(finded);
        };

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

        this.openDetailPage = (link)=> {
            $window.open(link, '_blank');
        };


        this.removeFromCollection = movie=> {
            var finded = rootUser.movies.findBy('link', movie.link);
            if (finded) {
                confirm($hangul.get_With_을를(finded.title.removeTags()) + " 콜렉션에서 제거합니다.").then(()=> {
                    $ajax.delete('/api/v1/movie', {link: finded.link}).then(()=> {
                        rootUser.movies.remove(finded);
                    });
                });
            }
        };

        function getMovies(keyword) {
            $ajax.get('/api/v1/search/movie', {query: keyword}).then(response=> {
                self.movies = response.result;
                self.movieLength = 10;
            })
        }

        this.movieMore = ()=> {
            this.movieLength += 10;
        };
    }
})();