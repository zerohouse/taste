(function () {
    'use strict';
    angular.module('app')
        .factory('alert', alert);
    /* @ngInject */
    function alert($mdToast, $mdDialog) {
        var body = document.querySelector('html');

        function toast(text, element) {
            var el = body;
            if (element) {
                el = element;
            }
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('bottom right')
                    .hideDelay(3000)
                    .parent(el)
            );
        }

        toast.window = (title, text) => {
            $mdDialog
                .show($mdDialog
                    .alert()
                    .title(title)
                    .textContent(text)
                    .ariaLabel('alert')
                    .ok('확인')
                )
        };

        return toast;
    }
}());