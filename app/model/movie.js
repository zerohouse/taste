(function () {
    angular.module('app').factory('Movie', MovieFactory);
    /* @ng-inject */
    function MovieFactory($ajax, alert, confirm, commentDialog, rootUser, $hangul) {

        function Movie(obj) {
            angular.copy(obj, this);
            var detail = "";
            var actors = this.actors.map(actor=> {
                return actor;
            });
            if (this.directors && this.directors[0])
                detail += "<strong>감독</strong> " + this.directors.join(", ");
            if (this.actors && this.actors[0]) {
                if (this.directors && this.directors[0]) {
                    detail += "<br>";
                }

                detail += "<strong>출연</strong> " + actors.splice(0,5).join(", ");
            }
            this.detail = detail;
            this.createAt = new Date(obj.createAt);
            this.updateAt = new Date(obj.updateAt);

            if (this.comment)
                return;
            if (!rootUser.contents)
                return;
            var finded = rootUser.contents.findById(obj.id);
            if (finded)
                this.comment = finded.comment;
            
        }

        Movie.prototype.openCommentDialog = function () {
            commentDialog(
                this.title,
                this.detail,
                this.link,
                this.comment
            ).then(comment=> {
                var query = {};
                query.id = this.id;
                query.comment = comment;
                $ajax.post('/api/v1/movie/update', query).then(()=> {
                    this.comment = comment;
                });
            });
        };

        Movie.prototype.addAndDetail = function (selector) {
            if (!rootUser.id) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }
            var finded = rootUser.contents.findById(this.id);
            if (!finded) {
                $ajax.post('/api/v1/movie', this, true).then(resonpose=> {
                    this.updateAt = resonpose.result.updateAt;
                    this.createAt = resonpose.result.createAt;
                    rootUser.contents.push(this);
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
            var finded = rootUser.contents.findById(this.id);
            if (finded) {
                confirm($hangul.get_With_을를(finded.title.removeTags()) + " 콜렉션에서 제거합니다.").then(()=> {
                    $ajax.delete('/api/v1/movie', {id: finded.id}).then(()=> {
                        rootUser.contents.remove(finded);
                    });
                });
            }
        };

        return Movie;
    }
})();