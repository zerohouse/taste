(function () {
    angular.module('app').factory('Movie', MovieFactory);
    /* @ng-inject */
    function MovieFactory($ajax, alert, confirm, commentDialog, rootUser, $hangul) {

        function Movie(obj) {
            angular.copy(obj, this);
        }

        Movie.prototype.openCommentDialog = function () {
            var detail = "";
            if (this.directors && this.directors[0])
                detail += "<strong>감독</strong> " + this.directors.join(",");
            if (this.actors && this.actors[0])
                detail += "<br><strong>출연</strong> " + this.actors.join(",");
            commentDialog(
                this.title,
                detail,
                this.link,
                this.comment
            ).then(comment=> {
                var query = {};
                query.id = this.id;
                query.comment = comment;
                $ajax.post('/api/v1/movie/update', query).then(()=> {
                    this.comment = comment
                });
            });
        };

        Movie.prototype.addAndDetail = function (selector) {
            if (!rootUser.id) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }
            var finded = rootUser.movies.findById(this.id);
            if (!finded) {
                $ajax.post('/api/v1/movie', this, true).then(resonpose=> {
                    rootUser.movies.push(new Movie(resonpose.result));
                    alert($hangul.get_With_이가(this.title.removeTags()) + " 콜렉션에 추가되었습니다.", document.querySelector(selector));
                });
                return;
            }
            this.openCommentDialog(finded);
        };


        Movie.prototype.removeFromCollection = function (event) {
            event.stopPropagation();
            if (!rootUser.id) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }
            var finded = rootUser.movies.findById(this.id);
            if (finded) {
                confirm($hangul.get_With_을를(finded.title.removeTags()) + " 콜렉션에서 제거합니다.").then(()=> {
                    $ajax.delete('/api/v1/movie', {id: finded.id}).then(()=> {
                        rootUser.movies.remove(finded);
                    });
                });
            }
        };

        return Movie;
    }
})();