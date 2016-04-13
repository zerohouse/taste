(function () {
    angular.module('app').factory('Message', MessageFactory);
    /* @ng-inject */
    function MessageFactory() {

        function Message(obj) {
            angular.copy(obj, this);
            this.createAt = new Date(obj.createAt);
        }

        return Message;
    }
})();