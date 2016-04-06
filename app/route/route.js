/* @ngInject */
angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("main", {
                name: "main",
                url: "/",
                templateUrl: '/pages/main/main.html',
                controller: 'mainCtrl',
                controllerAs: 'ctrl'
            });

        $urlRouterProvider.otherwise("/");
    });
