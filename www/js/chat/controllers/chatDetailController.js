/**
 * Created by XJB11 on 2016/4/24 0024.
 */
CHAT.CONTROLLERS
.controller('ChatDetailCtrl', ['$scope', '$stateParams',
  'Message', '$ionicScrollDelegate', '$timeout','$ionicHistory','$state',
  function($scope, $stateParams, Message, $ionicScrollDelegate, $timeout,$ionicHistory,$state) {
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
        "userId": $stateParams.messageId,
        "backUp": $stateParams.backUp,
        "userName": $stateParams.userName,
        "img": $stateParams.img,
        "lastMessage": null,
        "noReadMessages": 0,
        "showHints": false,
        "isTop": 0,
        "showMessage":true,
        "message": []
      };
      $scope.message = Message.getMessageById($stateParams.messageId);
      if($scope.message){
        $scope.message.noReadMessages = 0;
        $scope.message.showHints = false;
        Message.updateMessage($scope.message);
        $scope.messageNum = 10;
        $scope.messageDetils = Message.getAmountMessageById($scope.messageNum,
          $stateParams.messageId);
      } else {
        $scope.message = params;
        $scope.messageNum = 0;
        $scope.messageDetails = [];
      }
      $timeout(function() {
        viewScroll.scrollBottom();
      }, 0);
    });

    $scope.goBack = function(){
      $ionicHistory.goBack();
    };

    $scope.goFriendInfo = function(){
    var forwardTo =  $state.current.data.forwardTo.friendInfo;
      $state.go(forwardTo[0],{friendId:$scope.message.userId});
    };

    window.addEventListener("native.keyboardshow", function(e){
      viewScroll.scrollBottom();
    });
  }
])
