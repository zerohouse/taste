(function () {
    angular.module('app').factory('confirm', confirm);
    /* @ng-inject */
    function confirm($mdDialog) {
        var confirm = function (title, description) {
            var confirm = $mdDialog.confirm()
                .title(title)
                .textContent(description)
                .ariaLabel(title)
                .ok('확인')
                .cancel('취소');
            return $mdDialog.show(confirm);
        };
        return confirm;
    }
})();