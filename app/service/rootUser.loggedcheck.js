(function () {
    angular.module('app').run(LoggedCheck);
    /* @ng-inject */
    function LoggedCheck(rootUser, $ajax, Movie, Book, Music) {
        $ajax.get('/api/v1/user').then(function (result) {
            var user = result.result;
            if (!user) {
                return;
            }
            user.contents = user.contents.map(content=> {
                if (content.type === "SONG")
                    return new Music(content);
                if (content.type === "ALBUM")
                    return new Music(content);
                if (content.type === "ARTIST")
                    return new Music(content);
                if (content.type === "BOOK")
                    return new Book(content);
                if (content.type === "MOVIE")
                    return new Movie(content);
            });
            rootUser.setProperties(user);
        });
    }
})();