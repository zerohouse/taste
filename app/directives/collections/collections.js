(function () {
    angular.module('app').directive('collections', collections);
    /* @ng-inject */
    function collections() {
        return {
            restrict: 'E',
            templateUrl: '/directives/collections/collections.html',
            scope: {
                contents: '='
            },
            controller: function ($scope) {
                $scope.offset = 0;
                $scope.left = function () {
                    if ($scope.offset === 0)
                        return;
                    $scope.offset -= 1;
                };
                $scope.right = function () {
                    if ($scope.offset > $scope.contents.length - 6)
                        return;
                    $scope.offset += 1;
                };
            }
        };
    }
})();