/**
 * Created by XJB11 on 2016/4/24 0024.
 */
CHAT.CONTROLLERS
.controller('ChatDetailCtrl', ['$scope', '$stateParams',
  'Message', '$ionicScrollDelegate', '$timeout','$ionicHistory',
  function($scope, $stateParams, Message, $ionicScrollDelegate, $timeout,$ionicHistory) {
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
      $scope.message = Message.getMessageById($stateParams.messageId);
      $scope.message.noReadMessages = 0;
      $scope.message.showHints = false;
      Message.updateMessage($scope.message);
      $scope.messageNum = 10;
      $scope.messageDetils = Message.getAmountMessageById($scope.messageNum,
        $stateParams.messageId);
      $timeout(function() {
        viewScroll.scrollBottom();
      }, 0);
    });

    $scope.goBack = function(){
      $ionicHistory.goBack();
    };

    window.addEventListener("native.keyboardshow", function(e){
      viewScroll.scrollBottom();
    });
  }
])
