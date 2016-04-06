(function () {
    angular.module('app').factory('commentDialog', commentDialog);
    /* @ng-inject */

    var detail = {};

    function commentDialog($mdDialog, $mdMedia) {
        return (title, description, link, comment)=> {
            detail.title = title;
            detail.description = description;
            detail.comment = comment;
            detail.link = link;
            return $mdDialog.show({
                controller: DialogController,
                templateUrl: '/service/commentDialog/commnetDialog.html',
                parent: angular.element(document.body),
                fullscreen: $mdMedia('xs')
            })
        };
    }

    function DialogController($scope, $mdDialog, $window) {
        $scope.detail = detail;
        $scope.cancel = $mdDialog.cancel;
        $scope.hide = function (text) {
            $mdDialog.hide(text);
        };
        $scope.moveLink = function () {
            $window.open(detail.link, '_blank');
        };
    }
})();