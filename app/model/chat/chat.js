(function () {
    angular.module('app').factory('Chat', ChatFactory);
    /* @ng-inject */
    function ChatFactory(rootUser, Message) {

        var hostStatus = {
            OPEN: "대화 중",
            DECLINED: "대화를 거절함",
            CLOSED: "종료된 대화",
            NOT_ACCEPTED: "대화 수락을 기다리는 중"
        };

        var inviteStatus = {
            OPEN: "대화 중",
            CLOSED: "종료된 대화",
            NOT_ACCEPTED: "대화 요청을 받음"
        };

        function Chat(obj) {
            angular.copy(obj, this);
            if (obj.hostUser.id === rootUser.id) {
                this.me = obj.hostUser;
                this.you = obj.invitedUser;
                this.status = hostStatus[this.state];
            }
            if (obj.invitedUser.id === rootUser.id) {
                this.me = obj.invitedUser;
                this.you = obj.hostUser;
                this.status = inviteStatus[this.state];
                if(this.state === 'NOT_ACCEPTED'){
                    this.invited = true;
                }
            }
            this.messages = this.messages.map(message=> {
                return new Message(message);
            });
        }

        Chat.prototype.getName = function () {
            return this.you.name + "님과의 대화";
        };

        return Chat;
    }
})();