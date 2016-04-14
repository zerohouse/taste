(function () {
    angular.module('app').service('rootUser', rootUser);
    /* @ng-inject */
    function rootUser() {
        this.setProperties = (properties, contentFactory, Chat) => {
            if (!properties)
                return;
            this.id = properties.id;
            this.name = properties.name;
            this.email = properties.email;
            this.gender = properties.gender;
            this.age = properties.age;
            this.introduce = properties.introduce;
            this.district = properties.district;
            this.matchedUsers = properties.matchedUsers;
            this.chats = properties.chats.map(chat=> {
                return new Chat(chat);
            });
            this.contents = properties.contents.map(content=> {
                return contentFactory.getNew(content);
            });
        };

        this.logout = () => {
            var user = {};
            user.setProperties = this.setProperties;
            user.logout = this.logout;
            angular.copy(user, this);
        };
    }


})();