/* @ngInject */
angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("main", {
                name: "main",
                url: "/",
                templateUrl: '/pages/main/main.html',
                controller: 'mainCtrl',
                controllerAs: 'ctrl',
                title: "아트나인"
            })
            .state("movie", {
                name: "movie",
                url: "/movie",
                templateUrl: '/pages/search/search.html',
                controller: 'searchCtrl',
                controllerAs: 'ctrl',
                title: "영화"
            })
            .state("book", {
                name: "book",
                url: "/book",
                templateUrl: '/pages/search/search.html',
                controller: 'searchCtrl',
                controllerAs: 'ctrl',
                title: "책"
            })
            .state("music", {
                name: "music",
                url: "/music",
                templateUrl: '/pages/search/search.html',
                controller: 'searchCtrl',
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
            .state("chat", {
                name: "chat",
                url: "/chat?=id",
                templateUrl: '/pages/chat/chat.html',
                controller: 'chatCtrl',
                controllerAs: 'ctrl',
                title: "대화"
            })
            .state("match", {
                name: "match",
                url: "/match",
                templateUrl: '/pages/match/match.html',
                controller: 'matchCtrl',
                controllerAs: 'ctrl',
                title: "나와 비슷한 것을 좋아하는"
            })
            .state("collection", {
                name: "collection",
                url: "/collection",
                templateUrl: '/pages/collection/collection.html',
                controller: 'collectionCtrl',
                controllerAs: 'ctrl',
                title: "내 콜렉션"
            })
            .state("page", {
                name: "page",
                url: "/:email",
                templateUrl: '/pages/page/page.html',
                controller: 'pageCtrl',
                controllerAs: 'ctrl',
                title: "페이지"
            });

        $urlRouterProvider.otherwise("/");
    });
