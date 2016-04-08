/* @ngInject */
angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("movie", {
                name: "movie",
                url: "/",
                templateUrl: '/pages/movie/movie.html',
                controller: 'movieCtrl',
                controllerAs: 'ctrl',
                title: "영화"
            })
            .state("book", {
                name: "book",
                url: "/book",
                templateUrl: '/pages/book/book.html',
                controller: 'bookCtrl',
                controllerAs: 'ctrl',
                title: "책"
            })
            .state("music", {
                name: "music",
                url: "/music",
                templateUrl: '/pages/music/music.html',
                controller: 'musicCtrl',
                controllerAs: 'ctrl',
                title: "음악"
            })
            .state("user", {
                name: "user",
                url: "/user",
                templateUrl: '/pages/user/user.html',
                controller: 'userCtrl',
                controllerAs: 'ctrl',
                title: "내 정보"
            })
            .state("collection", {
                name: "collection",
                url: "/collection",
                templateUrl: '/pages/collection/collection.html',
                controller: 'collectionCtrl',
                controllerAs: 'ctrl',
                title: "내 콜렉션"
            });

        $urlRouterProvider.otherwise("/");
    });
