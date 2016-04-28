CHAT.SERVICES
    .constant("$ionicLoadingConfig", {
        template: "您的网络不给力",
        noBackdrop: true,
        duration: 1000
    })
    .factory('overTimeLoading',['$ionicLoading', function ($ionicLoading) {

        return {
            load: function (params) {
                $ionicLoading.show(params);
            },
            hide: function () {
                $ionicLoading.hide();
            }
        };
    }])
    .factory('ionicLoading',[ '$ionicLoading', function ($ionicLoading) {

        return {
            load: function (params) {
                if (params == null) {
                    params = {};
                }
                params.template = "<ion-spinner icon='android' class='spinner-stable'></ion-spinner> ";
                params.duration = 0;
                params.noBackdrop = false;
                $ionicLoading.show(params);
            },
            hide: function () {
                $ionicLoading.hide();
            }
        };
    }]
);
