(function () {
    angular.module('app').controller('matchCtrl', matchCtrl);
    /* @ng-inject */
    function matchCtrl(rootUser) {
        this.users = [rootUser];
    }
})();