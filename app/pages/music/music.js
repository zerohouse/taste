(function () {
    angular.module('app').controller('musicCtrl', musicCtrl);
    /* @ng-inject */
    function musicCtrl($ajax, $scope, $timeout, Music, Defaults) {
        var ajax, self = this;
        this.keyword = '';
        this.musics = Defaults.musics;
        
        $scope.$watch(()=> {
            return this.keyword;
        }, keyword=> {
            $timeout.cancel(ajax);
            if (!keyword) {
                self.musics = Defaults.musics;
                return;
            }
            ajax = $timeout(function () {
                getMusics(keyword);
            }, 300);
        });

        function getMusics(keyword) {
            $ajax.get('/api/v1/search/music', {query: keyword}).then(response=> {
                self.musics = response.result.map(music=> {
                    return new Music(music);
                });
            });
        }
    }
})();