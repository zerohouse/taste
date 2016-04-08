(function () {
    angular.module('app').controller('userCtrl', userCtrl);
    /* @ng-inject */
    function userCtrl($ajax, alert) {
        this.update = function(user){
            $ajax.post('/api/v1/user/update', user).then(()=>{
               alert("정보가 업데이트 되었습니다.");
            });
        }

    }
})();