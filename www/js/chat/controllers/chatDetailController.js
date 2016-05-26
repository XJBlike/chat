/**
 * Created by XJB11 on 2016/4/24 0024.
 */
CHAT.CONTROLLERS
.controller('ChatDetailCtrl', ['$scope', '$stateParams',
  'Message', '$ionicScrollDelegate', '$timeout','$ionicHistory','$state','Storage','socket',
  function($scope, $stateParams, Message, $ionicScrollDelegate, $timeout,$ionicHistory,$state,Storage,socket) {
    var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
    // console.log("enter");
    $scope.doRefresh = function() {
      // console.log("ok");
      $scope.messageNum += 5;
      $timeout(function() {
        $scope.messageDetils = Message.getAmountMessageById($scope.messageNum,
          $stateParams.messageId);
        $scope.$broadcast('scroll.refreshComplete');
      }, 200);
    };

    $scope.$on("$ionicView.beforeEnter", function() {
      var params = {
        "id": $stateParams.messageId,
        "backname": $stateParams.backname,
        "nickname": $stateParams.nickname,
        "img": $stateParams.img,
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
            isFromMe:null
      };
      $scope.user = Storage.get("userInfo");
      $scope.records = Storage.get("records");
      $scope.message = Message.getMessageById($stateParams.messageId);
      if($scope.message){
        $scope.message.noReadMessages = 0;
        $scope.message.showHints = false;
        $scope.messageNum = 10;
      } else {
        $scope.message = params;
        $scope.records.push($scope.message);
        Storage.set("records",$scope.records);
        Message.updateMessage($scope.message);
        $scope.messageNum = 0;
      }
      $timeout(function() {
        viewScroll.scrollBottom();
      }, 0);
    });

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
      $scope.currentMessage.isFromMe = true;
      $scope.currentMessage.time = Date.now();
      $scope.message.messages.push($scope.currentMessage);
      $scope.message.lastMessage = $scope.currentMessage;
      Message.updateMessage($scope.message);
      socket.emit("message:send",{userId:$scope.user.id,friendId:$scope.message.id,currentMessage:$scope.currentMessage});
      $scope.currentMessage = {};
    };

    socket.on("message:receive",function(data){
      $scope.message.messages.push(data.message);
    });
}]);
