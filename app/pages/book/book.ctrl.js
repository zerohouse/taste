(function () {
    angular.module('app').controller('bookCtrl', bookCtrl);
    /* @ng-inject */
    function bookCtrl($ajax, $scope, $timeout, Book) {
        var ajax, self = this;
        this.keyword = '';

        var defaults;
        $ajax.get('/resources/data/books.json').then(books=> {
            defaults = this.books = books.map(book=> {
                return new Book(book);
            });
        });

        $scope.$watch(()=> {
            return this.keyword;
        }, keyword=> {
            $timeout.cancel(ajax);
            if (!keyword) {
                self.books = defaults;
                return;
            }
            ajax = $timeout(function () {
                getBooks(keyword);
            }, 300);
        });

        function getBooks(keyword) {
            $ajax.get('/api/v1/search/book', {query: keyword}).then(response=> {
                self.books = response.result.map(book=> {
                    return new Book(book);
                });
                self.bookLength = 10;
            });
        }

        this.more = ()=> {
            this.bookLength += 10;
        };
    }
})();