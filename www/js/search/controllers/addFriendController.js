/**
 * Created by XJB11 on 2016/5/6 0006.
 */
CHAT.CONTROLLERS
  .controller('AddFriendCtrl',['$scope','Storage','$http','$state','$stateParams','$ionicHistory',
    function($scope,Storage,$http,$state,$stateParams,$ionicHistory){
    $scope.$on('$ionicView.beforeEnter',function(){
      $scope.user = {};
      $http.get("../../../data/json/userInfo.json").success(function(data){
        $scope.user.message = data.userInfo.userName;
      }).then(function(){
          $scope.destinationId = $stateParams.userId;
      });
    });

      $scope.addRequest = function(){
        //TODO 需要将当前账户id以及请求添加好友的用户id、验证消息打包发送到服务器。
        $ionicHistory.goBack();
      };

      $scope.goBack =function(){
        $ionicHistory.goBack();
      };

      $scope.showLeftLength = function(){
        var message = $scope.user.message;
        $scope.leftLength = 12 - message.length;
      };
  }]);
