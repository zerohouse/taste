(function () {
    angular.module('app').controller('collectionCtrl', collectionCtrl);
    /* @ng-inject */
    function collectionCtrl($scope, rootUser) {
        this.contents = rootUser.contents;
        $scope.$watch('ctrl.keyword', (keyword)=> {
            this.contents = rootUser.contents.filter(content=> {
                for (var k in content) {
                    if (!content.hasOwnProperty(k)) continue;
                    if (content[k] === null) continue;
                    if (content[k].match && content[k].match(keyword)) {
                        return true;
                    }
                }
            });
        });
    }
})();