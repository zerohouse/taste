(function () {
    angular.module('app').factory('Music', MusicFactory);
    /* @ng-inject */
    function MusicFactory($ajax, alert, confirm, commentDialog, rootUser, $hangul) {

        function Music(obj) {
            angular.copy(obj, this);
            this.detail = this.description;
        }


        Music.prototype.openCommentDialog = function () {
            commentDialog(
                this.title,
                this.description,
                this.link,
                this.comment
            ).then(comment=> {
                var query = {};
                query.id = this.id;
                query.comment = comment;
                $ajax.post('/api/v1/music/update', query).then(()=> {
                    this.comment = comment;
                });
            });
        };

        Music.prototype.addAndDetail = function (selector) {
            if (!rootUser.id) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }
            var finded = rootUser.contents.findById(this.id);
            if (!finded) {
                $ajax.post('/api/v1/music', this, true).then(resonpose=> {
                    rootUser.contents.push(resonpose.result);
                    alert($hangul.get_With_이가(this.title.removeTags()) + " 콜렉션에 추가되었습니다.", document.querySelector(selector));
                });
                return;
            }
            this.openCommentDialog(finded);
        };


        Music.prototype.removeFromCollection = function (event) {
            event.stopPropagation();
            if (!rootUser.id) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }
            var finded = rootUser.contents.findById(this.id);
            if (finded) {
                confirm($hangul.get_With_을를(finded.title.removeTags()) + " 콜렉션에서 제거합니다.").then(()=> {
                    $ajax.delete('/api/v1/music', {id: finded.id}).then(()=> {
                        rootUser.contents.remove(finded);
                    });
                });
            }
        };


        return Music;
    }
})();