(function () {
    angular.module('app').service('rootUser', rootUser);
    /* @ng-inject */
    function rootUser() {
        this.setProperties = (properties) => {
            angular.merge(this, properties);
        };

        this.logout = () => {
            var user = {};
            user.setProperties = this.setProperties;
            user.logout = this.logout;
            angular.copy(user,this);
        };
    }


})();