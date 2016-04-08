(function () {
    angular.module('app').controller('musicCtrl', musicCtrl);
    /* @ng-inject */
    function musicCtrl($ajax, $scope, $timeout, Music) {
        var ajax, self = this;
        this.keyword = '';

        var defaults;
        $ajax.get('/resources/data/musics.json').then(musics=> {
            defaults = this.musics = musics.map(music=> {
                return new Music(music);
            });
        });

        $scope.$watch(()=> {
            return this.keyword;
        }, keyword=> {
            $timeout.cancel(ajax);
            if (!keyword) {
                self.musics = defaults;
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