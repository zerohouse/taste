(function () {
    angular.module('app').directive('userCard', userCard);
    /* @ng-inject */
    function userCard() {
        return {
            restrict: 'E',
            templateUrl: '/directives/usercard/user-card.html',
            scope: {
                user: '=',
                contents: '='
            }
        };
    }
})();