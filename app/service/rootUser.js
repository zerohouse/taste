(function () {
    angular.module('app').service('rootUser', rootUser);
    /* @ng-inject */
    function rootUser() {
        this.setProperties = (properties) => {
            this.id = properties.id;
            this.name = properties.name;
            this.email = properties.email;
            this.gender = properties.gender;
            this.age = properties.age;
            this.district = properties.district;
            this.contents = properties.contents;
        };

        this.logout = () => {
            var user = {};
            user.setProperties = this.setProperties;
            user.logout = this.logout;
            angular.copy(user,this);
        };
    }


})();