(function () {
    angular.module('app').directive('userCard', userCard);
    /* @ng-inject */
    function userCard() {
        return {
            restrict: 'E',
            templateUrl: '/directives/usercard/user-card.html',
            scope: {
                user: '=',
                contents: '='
            },
            /* @ng-inject */
            controller: function ($scope, $ajax, confirm, rootUser, Chat, alert) {
                $scope.inviteChat = function () {
                    confirm($scope.user.name + "님께 대화를 신청합니다.").then(()=> {
                        $ajax.post('/api/v1/chat/invite', {invitedUser: $scope.user.id}).then(function (response) {
                            alert($scope.user.name + "님께 대화를 신청했습니다.");
                            rootUser.chats.push(new Chat(response.result));
                        });
                    });
                };

                $scope.getPhoto = function (user) {
                    if (user.photo)
                        return user.photo;
                    return '/resources/icons/profile.png';
                };

                $scope.findChat = function (user) {
                    return rootUser.chats.find(chat=> {
                        return chat.hostUser.id === user.id || chat.invitedUser.id === user.id;
                    });
                };

            }
        };
    }
})();