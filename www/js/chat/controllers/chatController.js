/**
 * Created by XJB11 on 2016/4/24 0024.
 */
CHAT.CONTROLLERS
  .controller('ChatCtrl',['$scope','$ionicPopup','Message','$timeout',
    function($scope,$ionicPopup,Message,$timeout){
        $scope.$on('$ionicView.beforeEnter',function(){
            $scope.messages = Message.getAll();
            $scope.popup = {
              isPopup: false,
              index: 0
            };
        });

        $scope.removeMessage = function(message){
             Message.removeMessage(message);
             $scope.popup.optionsPopup.close();
             $scope.popup.isPopup = false;
        };

       $scope.topMessage = function(message) {
         if (message.isTop) {
           message.isTop = 0;
         } else {
           message.isTop = new Date().getTime();
         }
         $scope.popup.optionsPopup.close();
         $scope.popup.isPopup = false;
         messageService.updateMessage(message);
      };
      $scope.popupMessageOpthins = function(message) {
        $scope.popup.index = $scope.messages.indexOf(message);
        $scope.popup.optionsPopup = $ionicPopup.show({
          templateUrl: "templates/chat/popup.html",
          scope: $scope
        });
        $scope.popup.isPopup = true;
        $timeout(function(){
          $scope.popup.optionsPopup.close();
          $scope.popup.isPopup = false;
        },3000);
      };

  }]);
