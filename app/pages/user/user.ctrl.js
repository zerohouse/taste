(function () {
    angular.module('app').controller('userCtrl', userCtrl);
    /* @ng-inject */
    function userCtrl($ajax, alert, Upload, rootUser, confirm) {

        this.phone = rootUser.phone;
        this.matching = rootUser.matching;

        var self = this;

        this.update = function (user) {
            var query = {};
            angular.copy(user, query);
            query.phone = self.phone;
            query.contents = undefined;
            query.matchedUsers = undefined;
            query.chats = undefined;
            query.matching = self.matching;
            $ajax.post('/api/v1/user/update', query).then(()=> {
                user.phone = self.phone;
                alert("정보가 업데이트 되었습니다.");
                user.matching = self.matching;
            });
        };

        this.requestPhoneAuth = function (phone) {
            $ajax.post('/api/v1/auth/phone', {phone: phone}).then(()=> {
                alert("인증번호를 전송하였습니다.");
            });
        };


        this.uploadFile = function (file) {
            if (!file)
                return;
            Upload.upload({
                url: '/api/v1/upload',
                data: {file: file}
            }).then(function (resp) {
                if (resp.data.result)
                    confirm("프로필 사진을 변경합니다.").then(()=> {
                        $ajax.post('/api/v1/user/update', {photo: resp.data.result}).then(()=> {
                            rootUser.photo = resp.data.result;
                            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data.result);
                            alert("정보가 업데이트 되었습니다.");
                        });
                    });
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
    }
})();