/**
 * Created by XJB11 on 2016/4/24 0024.
 */
CHAT.CONTROLLERS
.controller('ChatDetailCtrl', ['$scope', '$stateParams',
  'Message', '$ionicScrollDelegate', '$timeout','$ionicHistory','$state','Storage','socket','CommonMethods','dateService',
  function($scope, $stateParams, Message, $ionicScrollDelegate, $timeout,$ionicHistory,$state,Storage,socket,CommonMethods,dateService) {
    var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');

    $scope.$on("$ionicView.beforeEnter", function() {
      $scope.user = Storage.get("userInfo");
      var userId = Storage.get("userInfo").id;
      var friend = $scope.getFromUserInfo($stateParams.id);
      var params = {
        "id": friend.id,
        "backname": friend.backname,
        "nickname": friend.nickname,
        "img": friend.img,
        "lastMessage": {},
        "noReadMessages": 0,
        "showHints": false,
        "isTop": 0,
        "showMessage":true,
        "messages": []
      };
      $scope.currentMessage = {
            content:null,
            time:null,
            isFromMe:null,
            screenTime:null
      };
      $scope.records = Storage.get("records");
      $scope.message = Message.getMessageById(friend.id);
      if($scope.message){
        for(var item in $scope.message.messages){
          item.realTime = dateService.handleMessageDate(item.screenTime);
        }
        $scope.message.noReadMessages = 0;
        $scope.message.showHints = false;
      } else {
        $scope.message = params;
      }
      Message.updateMessage($scope.message);
      $timeout(function() {
        viewScroll.scrollBottom();
      }, 0);
    });

    $scope.minusTime = function(a,b){
      var aTime = dateService.getMessageDate(a.screenTime);
      var bTime = dateService.getMessageDate(b.screenTime);
      if(aTime.year-bTime.year>0
         ||aTime.month-bTime.month>0
        ||aTime.day-bTime.day>0
        ||aTime.hour-bTime.hour>0
        ||aTime.minute-bTime.minute>1){
        a.showTime= true;
      }else{
        a.showTime = false;
      }
    };

    $scope.goBack = function(){
      $ionicHistory.goBack();
    };

    $scope.goFriendInfo = function(){
    var forwardTo =  $state.current.data.forwardTo.info;
      $state.go(forwardTo[0],{friendId:$scope.message.id,viewSource:"chatDetail"});
    };

    window.addEventListener("native.keyboardshow", function(e){
      viewScroll.scrollBottom();
    });

    $scope.sendMessage = function(){
      var userId = Storage.get("userInfo").id;
      var newDate = new Date();
      $scope.currentMessage.isFromMe = true;
      $scope.currentMessage.time = Date.parse(newDate);
      $scope.currentMessage.screenTime = dateService.getScreenDate(newDate);
      $scope.currentMessage.realTime =newDate.getHours()+":"+newDate.getMinutes();
     // $scope.minusTime($scope.currentMessage,$scope.message.messages[$scope.message.messages.length-1]);
      if(!CommonMethods.isMessageInArray($scope.message.messages,$scope.currentMessage)){
        $scope.message.messages.push($scope.currentMessage);
        $scope.message.lastMessage = $scope.currentMessage;
        viewScroll.scrollBottom();
      }
      Message.updateMessage($scope.message);
      socket.emit("message:send",{userId:userId,friendId:$scope.message.id,currentMessage:$scope.currentMessage});
      $scope.currentMessage = {};
    };

    $scope.goRecord = function(){
        var forwardTo = $state.current.data.forwardTo;
          $state.go(forwardTo.record[0],{friendId:$scope.message.id,img:$scope.message.img});
    };

    $scope.getFromUserInfo= function(friendId){
      var friendInfo = Storage.get('friendInfo');
      for(var i =0;i<friendInfo.length;i++){
        if(friendInfo[i].id == friendId){
          return friendInfo[i];
        }
      }
      return null;
    };

    socket.on("message:receive",function(data){
      var records = Storage.get("records");
      var userId = Storage.get("userInfo").id;
      var friendId = data.friendId;
      var fromUser = $scope.getFromUserInfo(friendId);
      var thisRecord = Message.getMessageById(friendId);
      var params = {
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
      if(!thisRecord){
        params.id = fromUser.id;
        params.img = fromUser.img;
        params.nickname = fromUser.nickname;
        params.backname = fromUser.backname;
      }else{
        params = thisRecord;
        params.showMessage = true;
      }
        if(friendId == $scope.message.id && !CommonMethods.isMessageInArray($scope.message.messages,data.message)){
          $scope.message.messages.push(data.message);
          viewScroll.scrollBottom();
        }
      if(!CommonMethods.isMessageInArray(params.messages,data.message)){
        if(friendId != $scope.message.id){
          params.noReadMessages++;
          params.showHints = true;
        }
      }
      if(thisRecord) {
        for (var i = 0; i < records.length; i++) {
          if (params.id == records[i].id) {
            records[i] = params;
          }
        }
      }else{
        records.push(params);
      }
        Storage.set("records",records);
    });
}]);
