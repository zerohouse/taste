(function () {
    angular.module('app').service('Items', Items);
    /* @ng-inject */
    function Items ($ajax, Music, Movie, Book) {
        $ajax.get('/resources/data/movies.json').then(movies=>{
            this.movies = movies.map(movie=> {
                return new Movie(movie);
            });
        });
        $ajax.get('/resources/data/books.json').then(books=>{
            this.books = books.map(book=> {
                return new Book(book);
            });
        });
        $ajax.get('/resources/data/musics.json').then(musics=>{
            this.musics = musics.map(music=> {
                return new Music(music);
            });
        });
    }
})();