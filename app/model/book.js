(function () {
    angular.module('app').factory('Book', BookFactory);
    /* @ng-inject */
    function BookFactory($ajax, commentDialog, rootUser, alert, $hangul, confirm) {

        function Book(obj) {
            angular.copy(obj, this);
        }

        Book.prototype.addAndDetail = function (selector) {
            if (!rootUser.id) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }
            var finded = rootUser.books.findById(this.id);
            if (!finded) {
                $ajax.post('/api/v1/book', this, true).then(resonpose=> {
                    rootUser.books.push(new Book(resonpose.result));
                    alert($hangul.get_With_이가(this.title.removeTags()) + " 콜렉션에 추가되었습니다.", document.querySelector(selector));
                });
                return;
            }
            this.openCommentDialog();
        };


        Book.prototype.removeFromCollection = function (event) {
            event.stopPropagation();
            if (!rootUser.id) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }
            var finded = rootUser.books.findById(this.id);
            if (finded) {
                confirm($hangul.get_With_을를(finded.title.removeTags()) + " 콜렉션에서 제거합니다.").then(()=> {
                    $ajax.delete('/api/v1/book', {id: finded.id}).then(()=> {
                        rootUser.books.remove(finded);
                    });
                });
            }
        };


        Book.prototype.openCommentDialog = function () {
            var detail = "";
            if (this.authors && this.authors[0])
                detail += "<strong>작가</strong> " + this.authors.join(",");
            if (this.publisher)
                detail += "<br><strong>출판사</strong> " + this.publisher;
            if (this.description)
                detail += "<br><small>" + this.description + "</small>";
            commentDialog(
                this.title,
                detail,
                this.link,
                this.comment
            ).then(comment=> {
                var query = {};
                query.id = this.id;
                query.comment = comment;
                $ajax.post('/api/v1/book/update', query).then(()=> {
                    this.comment = comment;
                });
            });
        };


        return Book;
    }
})();