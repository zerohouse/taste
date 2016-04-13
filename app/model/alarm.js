(function () {
    angular.module('app').factory('Alarm', AlarmFactory);
    /* @ng-inject */
    function AlarmFactory() {

        function Alarm(obj) {
            angular.copy(obj, this);
        }

        return Alarm;
    }
})();