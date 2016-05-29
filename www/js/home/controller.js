/**
 * Created by XJB11 on 2016/4/24 0024.
 */
//
CHAT.CONTROLLERS
  .controller('AbstractTabsCtrl',['$rootScope','$scope','Storage','$state','$ionicHistory','Message','socket','CommonMethods',
    function($rootScope,$scope,Storage,$state,$ionicHistory,Message,socket,CommonMethods){
      $scope.$on('$ionicView.beforeEnter',function(){
        $scope.isShowTabs = $state.is('tab.chat') ||
                            $state.is('tab.friends') ||
                            $state.is('tab.mine');
      if(!Storage.get("userInfo")&&!$state.is('tab.mine-information')){
          $state.go("tab.mine-login");
        }else{
        if($scope.isShowTabs){
          $ionicHistory.clearHistory();
        }
        if($ionicHistory.backView()==null&&!$scope.isShowTabs){
          var userInfo = Storage.get("userInfo");
          var userId = userInfo.id;
          var allRecords = Storage.get("allRecords");
          allRecords[userId] = Storage.get("records");
          Storage.set("allRecords",allRecords);
          Storage.remove("userInfo");
          Storage.remove("records");
          Storage.remove("friendInfo");
          socket.emit("logout",{userInfo:userInfo});
          $state.go("tab.mine-login");
        }
        if(!$state.is('tab.mine-login')&& !$state.is('tab.mine-information')){
          if(!Storage.get("records")||!Storage.get("allRecords")){
            Message.init();
          }
        }
      }
      });

      socket.on("message:receive",function(data){
        var friendId = data.friendId;
        var friendInfo = Storage.get("friendInfo");
        var fromFriend = {};
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
        var record = Message.getMessageById(friendId);
        if(!record){
          for(var i=0;i<friendInfo.length;i++){
            if(friendInfo[i].id == friendId){
              fromFriend = friendInfo[i];
            }
          }
          messageStruct.id=fromFriend.id;
          messageStruct.nickname=fromFriend.nickname;
          messageStruct.backname=fromFriend.backname;
          messageStruct.img=fromFriend.img;
        }else{
          messageStruct=record;
          messageStruct.showMessage=true;
        }
        messageStruct.messages.push(data.message);
        messageStruct.lastMessage=data.message;
        if(!$state.is('tab.chat-detail')&&!$state.is('tab.friends-chatDetail')&&!$state.is('tab.chat')){
          messageStruct.noReadMessages++;
          messageStruct.showHints=true;
          Message.updateMessage(messageStruct);
          CommonMethods.showAlert(messageStruct.backname+"说："+messageStruct.lastMessage.content);
        }
      });
  }]);
