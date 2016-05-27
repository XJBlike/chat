/**
 * Created by XJB11 on 2016/4/24 0024.
 */
//
CHAT.CONTROLLERS
  .controller('AbstractTabsCtrl',['$rootScope','$scope','Storage','$state','$ionicHistory','Message','socket','Message',
    function($rootScope,$scope,Storage,$state,$ionicHistory,Message,socket,Message){
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
          $state.go('tab.friends');
        }
        if(!Storage.get("records")){
          Message.init();
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
        }
        messageStruct.messages.push(data.message);
        messageStruct.lastMessage=data.message;
        if(!$state.is('tab.chat-detail')&&!$state.is('tab.friends-chatDetail')){
          messageStruct.noReadMessages++;
          messageStruct.showHints=true;
          Message.updateMessage(messageStruct);
        }
      });
  }]);
