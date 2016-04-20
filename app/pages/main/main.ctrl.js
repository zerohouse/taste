(function () {
    angular.module('app').controller('mainCtrl', mainCtrl);
    /* @ng-inject */


    function mainCtrl($ajax, alert) {

        var self = this;
        this.replies = [];
        this.message = '';
        self.count = {male:0, female:0};

        this.write = function () {
            if (self.message.length < 10) {
                alert("열자 이상 작성해주세요.");
                return;
            }
            $ajax.post('/api/v1/reply', {message: self.message}).then(response=> {
                this.replies.unshift(new Reply(response.result));
                self.message = '';
            });
        };

        $ajax.get('/api/v1/reply').then(response=> {
            response.result.forEach(reply=> {
                self.replies.push(new Reply(reply));
            });
        });

        $ajax.get('/api/v1/user/count').then(response=> {
            self.count = response.result;
        });

        function Reply(obj) {
            this.id = obj.id;
            this.user = obj.user;
            this.message = obj.message;
            this.createAt = new Date(obj.createAt);
        }

        Reply.prototype.delete = function () {
            $ajax.delete('/api/v1/reply', {id: this.id}).then(()=> {
                self.replies.remove(this);
            });
        };
    }
})();