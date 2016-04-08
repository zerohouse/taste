(function () {
    angular.module('app').run(LoggedCheck);
    /* @ng-inject */
    function LoggedCheck(rootUser, $ajax, Movie, Book, Music) {
        $ajax.get('/api/v1/user').then(function (result) {
            var user = result.result;
            if (!user) {
                return;
            }
            user.movies = user.movies.map(movie=> {
                return new Movie(movie);
            });
            user.musics = user.musics.map(music=> {
                return new Music(music);
            });
            user.books = user.books.map(book=> {
                return new Book(book);
            });
            rootUser.setProperties(user);
        });
    }
})();