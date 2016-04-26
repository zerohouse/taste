(function () {
    angular.module('app').service('Defaults', Defaults);
    /* @ng-inject */
    function Defaults(contentFactory, $ajax) {
        this.movie = [];
        this.book = [];
        this.music = [];
        $ajax.get('/resources/data/data.json').then((response)=> {
            if (response.movies)
                response.movies.forEach(movie=> {
                    this.movie.push(contentFactory.getRootUserContent(movie));
                });
            if (response.books)
                response.books.forEach(book=> {
                    this.book.push(contentFactory.getRootUserContent(book));
                });
            if (response.musics)
                response.musics.forEach(music=> {
                    this.music.push(contentFactory.getRootUserContent(music));
                });
        });
    }
})();