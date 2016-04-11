(function () {
    angular.module('app').directive('contentSummary', contentSummary);
    /* @ng-inject */
    function contentSummary() {
        return {
            restrict: 'E',
            templateUrl: '/directives/content-summary/content-summary.html',
            scope: {
                content: '='
            }
        };
    }
})();