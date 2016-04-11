(function () {
    angular.module('app').directive('content', content);
    /* @ng-inject */
    function content() {
        return {
            restrict: 'E',
            templateUrl: '/directives/content/content.html',
            controller: 'contentDirectiveCtrl',
            scope: {
                content: '=',
                collection: '='
            }
        };
    }
})();