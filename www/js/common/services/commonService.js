CHAT.SERVICES
    .factory('CommonMethods', ["$state","$timeout", "$ionicHistory", "$ionicPopup", "$ionicLoading","Storage",
        function ($state,$timeout, $ionicHistory, $ionicPopup, $ionicLoading, Storage) {
        return {
            /**
             * 弹出对话框
             * @param title
             * @param context
             */
            showAlert: function (context) {
                if (context == null) {
                    context = "";
                }
                var alertPopup = $ionicPopup.alert({
                    title: "提示",
                    template:"<ion-item style='background-color: #EDEDED;padding-left: 35px;padding-right: 35px;'><span style='font-size: 16px;'>"+context+"</span></ion-item>",
                    okText: '确认'
                });
                alertPopup.then();
                return alertPopup;
            },

            /**
             * 加载时延迟提示
             */
            showLoading: function (params) {
                var defaultParams = {"template": "努力加载中..."};
                var toParams = angular.extend(defaultParams, params || {});
                $ionicLoading.show(toParams);
            },
            /**
             * 隐藏加载时提示
             */
            hideLoading: function () {
                $ionicLoading.hide();
            },
            isMessageInArray : function(arr,message){
              for(var i=0;i<arr.length;i++){
                if(arr[i].time == message.time && arr[i].time == message.time){
                  return true;
                }
              }
              return false;
            },
            /**
             * 警告对话框
             * @param title
             * @param content
             * @param duration
             * @param callback
             */
            alert: function (title, content, duration, callback) {
                var alertPopup = $ionicPopup.alert({
                    title:title,
                    template: content,
                    okText: "确定"
                });
                if (angular.isNumber(duration) && duration > 0) {
                    $timeout(function () {
                        alertPopup.close();
                    }, duration);
                }
                alertPopup.then(callback);
            },
            /**
             * 确认对话框
             * @param title
             * @param content
             * @param callback
             */
            confirm: function (title, content, sucCallback,failCallback) {
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    template: content,
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
            },
            /**
             * 提示对话框
             * @param title
             * @param template
             * @param inputType
             * @param inputPlaceholder
             * @param callback
             */
            prompt:function(title,template,inputType,inputPlaceholder,callback){
                $ionicPopup.prompt({
                    title: title,
                    template: template,
                    inputType:inputType,
                    inputPlaceholder:inputPlaceholder,
                    cancelText: "取消",
                    okText: "确定"
                }).then(callback);
            },
            /**
             * 自定义弹出框
             * @param title
             * @param context
             * @param duration
             * @param callback
             * @param buttons
             */
            show:function(title,context,duration,callback,buttons){
                if(!(buttons instanceof Array)){
                    buttons=[
                        {
                            text: '取消'
                        },
                        {
                            text: '<b>确定</b>',
                            type: 'button-positive'
                        }
                    ];
                }
                var showPopup = $ionicPopup.show({
                    title:title,
                    template:context,
                    buttons:buttons
                });
                showPopup.then(callback);
                if (angular.isNumber(duration) && duration > 0) {
                    $timeout(function() {
                        showPopup.close();
                    }, duration);
                }
            },
            /**
             * 判断是否登陆了医院
             * @returns {*}
             */
            isLoginHospital:function() {
                return Storage.get('hospital') && Storage.get('hospital').id;
            },
            /**
             * 判断用户是否登陆
             * @returns {*}
             */
            isLogin:function() {
                return Storage.get('userInfo') && Storage.get('userInfo').id;
            },
            /**
             * 清除重复历史记录
             * @param history
             * @param stateName
             * @returns {*}
             * gaoxing
             */
            clearDuplicateHistory:function(history,stateName){
                var deleteLength = 0;
                for (var i = history.cursor - 1; i >= 0; i--) {
                    deleteLength++;
                    if (history.stack[i].stateName === stateName) {
                        break;
                    }
                }
                if (deleteLength < history.cursor) {
                    history.stack[history.cursor].index -= deleteLength;
                    history.stack[history.cursor].stateId = history.stack[history.cursor - deleteLength].stateId;
                    history.stack[history.cursor].stateParams = history.stack[history.cursor - deleteLength].stateParams;
                    history.stack.splice(history.cursor - deleteLength, deleteLength);
                    history.cursor -= deleteLength;
                    var view = history.stack[history.cursor - 1];
                    view.forwardViewId = history.stack[history.cursor].viewId;
                    history.stack[history.cursor].backViewId = view.viewId;
                }
                return history;
            },
            /**
             * 获取跳转来源页面stateName
             * @param history
             * @returns {*}
             */
            getFromPageStateName:function(history){
                if(history.cursor>0){
                    return history.stack[history.cursor-1].stateName;
                }
                return null;
            },
            /**
             * Toast组件
             * @param pMessage   显示的内容
             * @param duration  显示时间长短  {“short”，“long”}
             * @param position   显示位置    {“top”,“center”,“bottom”}
             * @param successCallback   成功回调
             * @param errorCallback     失败回调
             */
            showToast:function(pMessage,duration,position,successCallback,errorCallback){
                if(showToastFlag) {
                    return;
                }
                showToastFlag = true;
                var message = pMessage||"请求失败";
                if(!(duration==="short"||duration==="long")){
                    duration="short";
                }
                if(!(position==="top"||position==="center"||position==="bottom")){
                    position="center";
                }
                if(!window.plugins){
                    var len = message.length;
                    var pop = $ionicPopup.alert({
                            title: "提示",
                            template: len>16 ? message : "<p style='text-align:center'>"+message+"</p>",
                            okText: "确定"
                        }).then(function() {
                        showToastFlag = false;
                    });
                }
                if(!successCallback||!errorCallback){
                    if(window.plugins)
                    window.plugins.toast.show(message,duration,position);
                }else {
                    window.plugins.toast.show(message, duration, position, successCallback, errorCallback);
                }
            },


            /**
             * 日期转化为字符串。
             * @param title
             * @param content
             * @param callback
             */
            date2Str: function (date) {
                    if(date == null){
                    return null;
                }else{
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var hour = date.getHours();
                    var minite = date.getMinutes();
                    var second = date.getSeconds();
                    return fill0(year,4) + "" + fill0(month,2) + ""+ fill0(day,2) + "" + fill0(hour,2) + "" + fill0(minite,0) + ""+ fill0(second,0) ;
                }
            },

            /**
             * 判断是否为空对象；
             * @param obj
             * return boolean
             * */
            isEmptyObj: function (obj) {
                if(obj==undefined||obj==null){
                    return true;
                }
                for ( var prop in obj) {
                    return false;
                }
                return true;
            }

         }
    }]);

