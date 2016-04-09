(function () {
    angular.module('app').controller('contentDirectiveCtrl', contentDirectiveCtrl);
    /* @ng-inject */
    function contentDirectiveCtrl($scope, rootUser) {
        $scope.user = rootUser;
    }
})();