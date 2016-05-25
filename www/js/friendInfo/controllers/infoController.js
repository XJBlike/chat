/**
 * Created by XJB11 on 2016/5/24 0024.
 */
CHAT.CONTROLLERS
   .controller("InfoCtrl",['$scope','$state','$stateParams','$ionicHistory','Storage','socket',
     function($scope,$state,$stateParams,$ionicHistory,Storage,socket){
        $scope.$on("$ionicView.beforeEnter",function(){
          $scope.friendId = $stateParams.friendId;
          $scope.userId = Storage.get("userInfo").id;
          socket.emit('friendInfo',{friendId:$scope.friendId,userId:$scope.userId});
          socket.on('friendInfo:success',function(data){
            $scope.friend = data.friendInfo;
          });
        });

       $scope.goBack =function(){
         $ionicHistory.goBack();
       };
       $scope.goModifyBackname = function(){
         $state.go($state.current.data.forwardTo.modifyBack[0],{friend:$scope.friend,userId:$scope.userId});
       };
       $scope.goChat = function(friend){
         $state.go('tab.friends-chatDetail',{"messageId":friend.id,backname:friend.backname,nickname:friend.nickname,img:friend.img});
       };
   }])

.controller('ModifyBackCtrl',['$scope','$ionicHistory','socket','$state','$stateParams',
  function($scope,$ionicHistory,socket,$state,$stateParams){
    $scope.$on("$ionicView.beforeEnter",function(){
      $scope.friend = $stateParams.friend;
      $scope.userId = $stateParams.userId;
    });

    $scope.goBack = function(){
      $ionicHistory.goBack();
    };

    $scope.saveChange = function(){
      socket.emit("backnameChange",{friend:$scope.friend,userId:$scope.userId});
      $ionicHistory.goBack();
    };

    $scope.showLeftLength = function(){
      var backname = $scope.friend.backname;
      $scope.leftLength = 12 - backname.length;
    };
}]);
