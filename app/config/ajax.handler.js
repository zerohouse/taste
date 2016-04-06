(function () {
    angular.module('app').run(ajaxConfig);
    /* @ng-inject */
    function ajaxConfig($ajax, alert) {
        $ajax.handler((response)=> {
                if (response.status === "ERROR") {
                    alert.window(response.result);
                    return false;
                }
                if (response.status === "WARNING") {
                    alert(response.result);
                    return false;
                }
                return true;
            }
        );
    }
})();