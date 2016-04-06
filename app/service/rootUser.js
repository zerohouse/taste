(function () {
    angular.module('app').service('rootUser', rootUser);
    /* @ng-inject */
    function rootUser() {
        this.setProperties = (properties) => {
            this.name = properties.name;
            this.phone = properties.phone;
            this.email = properties.email;
            this.movies = properties.movies;
            this.songs = properties.songs;
            this.books = properties.books;
        };
    }
})();