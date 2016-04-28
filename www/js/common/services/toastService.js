/**
 * Created by hcl on 2016/3/4.
 */
CHAT.SERVICES
    .factory('ToastService',
        ["$ionicPopup","$timeout",
        function($ionicPopup, $timeout){
            return{
                /**
                 * 警告对话框
                 * 显示确定，手动关闭弹窗
                 * @param title
                 * @param message
                 */
                alert: function(title, message, callBack) {
                    if (title == null) {
                        title = "";
                    }
                    if (message == null) {
                        message = "";
                    }
                    var alertPopup = $ionicPopup.alert({
                        title: title,
                        template: "<p style='text-align:center'>"+message+"</p>",
                        okText: '确定'
                    });
                    alertPopup.then(callBack);

                },
                /**
                 * 警告对话框,自动消失
                 * 不显示按钮，经过一段时间后自动消失
                 * @param title
                 * @param message
                 * @param duration
                 * @param callback
                 */
                alertDismiss: function (title, message, duration, callback) {
                    if (title == null) {
                        title = "";
                    }
                    if (message == null) {
                        message = "";
                    }
                    var alertPopup = $ionicPopup.show({
                        title:title,
                        template:"<p style='text-align:center'>"+message+"</p>",
                        buttons:[]
                    });
                    alertPopup.then(callback);
                    if (angular.isNumber(duration) && duration > 0) {
                        $timeout(function () {
                            alertPopup.close();
                        }, duration);
                    }
                },
                /**
                 * 确认对话框
                 * 点击确定和取消
                 * @param title
                 * @param message
                 * @param sucCallback
                 * @param failCallback
                 */
                confirm: function (title, message, sucCallback,failCallback) {
                    if (title == null) {
                        title = "";
                    }
                    if (message == null) {
                        message = "";
                    }
                    var confirmPopup = $ionicPopup.confirm({
                        title: title,
                        template: "<p style='text-align:center'>"+message+"</p>",
                        cancelText: "取消",
                        okText: "确定"
                    });
                    confirmPopup.then(function(res){
                        if(res){
                            sucCallback();
                        }else{
                            failCallback();
                        }
                    });
                }
            }
    }]);
