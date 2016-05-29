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
              template: "<p style='background-color: #EDEDED;margin: 10px;text-align: center;font-size: 16px;'>" + context + "</p>",
              okText: '确认'
            });
            alertPopup.then();
            return alertPopup;
          },


          isMessageInArray: function (arr, message) {
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].time == message.time && arr[i].time == message.time) {
                return true;
              }
            }
            return false;
          }

        }
    }]);

