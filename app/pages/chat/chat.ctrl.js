(function () {
    angular.module('app').controller('chatCtrl', chatCtrl);
    /* @ng-inject */
    function chatCtrl($ajax, Message, alert, $mdDialog, rootUser, confirm, $stateParams, $scope) {

        var self = this;

        $scope.$watch(()=> {
            return $stateParams.id;
        }, id=> {
            if (!id) {
                self.selectChat(rootUser.chats[0]);
                return;
            }
            self.selectChat(rootUser.chats.findById(id));
        });

        this.sendMessage = function (chat) {
            if (chat.state === "NOT_ACCEPTED") {
                alert.window("아직 대화가 시작되지 않았습니다.");
                return;
            }
            if (chat.state === "DECLINED") {
                alert.window("상대방이 대화를 거절했습니다.");
                return;
            }
            if (chat.state === "CLOSED") {
                alert.window("닫힌 대화입니다.");
                return;
            }
            $ajax.post('/api/v1/chat/message', {chat: chat.id, message: self.message}).then(function (response) {
                chat.messages.push(new Message(response.result));
                self.message = '';
            });
        };

        this.selectChat = chat=> {
            this.chat = chat;
            if (!chat.invited)
                return;
            var confirm = $mdDialog.confirm()
                .title(chat.hostUser.name + "님이 대화를 신청하셨습니다.")
                .textContent("대화를 수락하시겠습니까?")
                .ariaLabel("conv")
                .parent(document.querySelector('#chat-list'))
                .ok('네. 대화를 시작합니다.')
                .cancel('아니오. 대화 하고 싶지 않습니다.');
            $mdDialog.show(confirm).then(function () {
                $ajax.post('/api/v1/chat/agree', {chat: chat.id}).then(function () {
                    chat.state = 'OPEN';
                });
            }, function () {
                $ajax.post('/api/v1/chat/decline', {chat: chat.id}).then(function () {
                    rootUser.chats.remove(chat);
                });
            });

        };


        this.closeChat = chat=> {
            confirm(chat.getName() + "를 종료합니다.", "대화 내용이 모두 삭제됩니다.").then(()=> {
                $ajax.post('/api/v1/chat/leave', {chat: chat.id}).then(function () {
                    rootUser.chats.remove(chat);
                });
            });
        };
    }
})();