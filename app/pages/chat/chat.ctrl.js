(function () {
    angular.module('app').controller('chatCtrl', chatCtrl);
    /* @ng-inject */
    function chatCtrl($ajax, Message, alert, $mdDialog, rootUser) {

        this.sendMessage = function (chat, message) {
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
            $ajax.post('/api/v1/chat/message', {chat: chat.id, message: message}).then(function (response) {
                chat.messages.push(new Message(response.result));
            });
        };

        this.selectChat = (chat)=> {
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
                $ajax.post('/api/v1/chat/agree', {chat: chat.id}).then(function (response) {
                    chat.state = 'OPEN';
                });
            }, function () {
                $ajax.post('/api/v1/chat/decline', {chat: chat.id}).then(function (response) {
                    rootUser.chats.remove(chat);
                });
            });

        };

    }
})();