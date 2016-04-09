(function () {
    angular.module('app').run(LoggedCheck);
    /* @ng-inject */
    function LoggedCheck(rootUser, $ajax, Movie, Book, Music) {
        $ajax.get('/api/v1/user').then(function (result) {
            var user = result.result;
            if (!user) {
                return;
            }
            user.contents = [];
            user.movies.forEach(movie=> {
                user.contents.push(new Movie(movie));
            });
            user.musics.forEach(music=> {
                user.contents.push(new Music(music));
            });
            user.books.forEach(book=> {
                user.contents.push(new Book(book));
            });
            rootUser.setProperties(user);
        });
    }
})();