/**
 * Created by XJB11 on 2016/4/24 0024.
 */
CHAT.CONTROLLERS
  .controller('ChatCtrl',['$scope','$ionicPopup','Message','$timeout','$state','socket','Storage',
    function($scope,$ionicPopup,Message,$timeout,$state,socket,Storage){
        $scope.$on('$ionicView.beforeEnter',function(){
            $scope.messages = Message.getAll();
            for(var i=0;i<$scope.messages.length;i++){
              if(!$scope.messages[i].messages.length){
                $scope.messages[i].showMessage = false;
              }
            }
            $scope.popup = {
              isPopup: false,
              index: 0
            };
        });

        $scope.removeMessage = function(message){
             message.showMessage = false;
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
         Message.updateMessage(message);
      };

      $scope.markMessage = function(message){
        if(message.noReadMessages){
          message.showHints = !message.showHints;
        } else {
          message.showHints = false;
        }
            $scope.popup.optionsPopup.close();
            $scope.popup.isPopup = false;
            Message.updateMessage(message);
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

      $scope.goMessageDetail = function(message){
        message.noReadMessages = 0;
        message.showHints = false;
        Message.updateMessage(message);
        $state.go('tab.chat-detail',{"id":message.id});
      };

      socket.on("message:receive",function(data){
        var friendId = data.friendId;
        var friendInfo = Storage.get("friendInfo");
        var fromFriend = {};
        var j =0;
        var messageStruct = {
          "id": null,
          "backname": null,
          "nickname": null,
          "img": null,
          "lastMessage": {},
          "noReadMessages": 0,
          "showHints": false,
          "isTop": 0,
          "showMessage":true,
          "messages": []
        };
        if($scope.messages.length!=0) {
          for (j = 0; j < $scope.messages.length; j++) {
            if ($scope.messages[j].id == friendId) {
              $scope.messages[j].noReadMessages++;
              $scope.messages[j].showHints = true;
              $scope.messages[j].showMessage = true;
              $scope.messages[j].lastMessage = data.message;
              $scope.messages[j].messages.push(data.message);
              Message.updateMessage($scope.messages[j]);
              break;
            }
          }
        }
          if(j == $scope.messages.length && $scope.messages[j-1].id !=friendId){
            for(var i=0;i<friendInfo.length;i++){
              if(friendInfo[i].id == friendId){
                fromFriend = friendInfo[i];
              }
            }
            messageStruct.id=fromFriend.id;
            messageStruct.nickname=fromFriend.nickname;
            messageStruct.backname=fromFriend.backname;
            messageStruct.img=fromFriend.img;
            messageStruct.messages.push(data.message);
            messageStruct.lastMessage=data.message;
            messageStruct.noReadMessages++;
            messageStruct.showHints=true;
            $scope.messages.push(messageStruct);
            Message.updateMessage(messageStruct);
          }
      });
  }]);
