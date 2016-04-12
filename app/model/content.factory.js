(function () {
    angular.module('app').service('contentFactory', contentFactory);
    /* @ng-inject */
    function contentFactory(Music, Movie, Book, $ajax, $q, rootUser) {
        var self = this;
        this.getNew = function (content) {
            if (rootUser.contents) {
                var exist = rootUser.contents.findById(content.id);
                if (exist)
                    return exist;
            }
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
        };

        this.search = function (type, query) {
            return $q(function (resolve) {
                $ajax.get('/api/v1/search/' + type, {query: query}).then(response=> {
                    if (!response.result) {
                        resolve([]);
                        return;
                    }
                    var results = response.result.map(content=> {
                        return self.getNew(content);
                    });
                    resolve(results);
                });
            });
        };

        this.searchMovieText = function (query) {
            return $q(function (resolve) {
                $ajax.get('/api/v1/search/movie/text', {query: query}).then(response=> {
                    if (!response.result) {
                        resolve([]);
                        return;
                    }
                    var results = response.result.map(content=> {
                        return self.getNew(content);
                    });
                    resolve(results);
                });
            });
        };

    }
})();