(function () {
    angular.module('app').service('Defaults', Defaults);
    /* @ng-inject */
    function Defaults(Movie, Book, Music, $ajax) {
        this.movies = [];
        this.books = [];
        this.musics = [];
        $ajax.get('/resources/data/data.json').then((response)=> {
            if (response.movies)
                response.movies.forEach(movie=> {
                    this.movies.push(new Movie(movie));
                });
            if (response.books)
                response.books.forEach(music=> {
                    this.books.push(new Book(music));
                });
            if (response.musics)
                response.musics.forEach(book=> {
                    this.musics.push(new Music(book));
                });
        });
    }
})();