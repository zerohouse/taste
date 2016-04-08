(function () {
    angular.module('app').controller('musicCtrl', musicCtrl);
    /* @ng-inject */
    function musicCtrl($ajax, $scope, $timeout, Music) {
        var ajax, self = this;
        this.keyword = '';

        $scope.$watch(()=> {
            return this.keyword
        }, keyword=> {
            if (!keyword)
                return;
            $timeout.cancel(ajax);
            ajax = $timeout(function () {
                getMusics(keyword);
            }, 300);
        });

        function getMusics(keyword) {
            $ajax.get('/api/v1/search/music', {query: keyword}).then(response=> {
                self.songs = [];
                self.artists = [];
                self.albums = [];
                response.result.forEach(music=> {
                    if (music.type === 'ARTIST') {
                        self.artists.push(new Music(music));
                        return;
                    }
                    if (music.type === 'ALBUM') {
                        self.albums.push(new Music(music));
                        return;
                    }
                    if (music.type === 'SONG') {
                        self.songs.push(new Music(music));
                    }
                });
            })
        }
    }
})();