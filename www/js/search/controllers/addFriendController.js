/**
 * Created by XJB11 on 2016/5/6 0006.
 */
CHAT.CONTROLLERS
  .controller('AddFriendCtrl',['$scope','Storage','$http','$state','$stateParams','$ionicHistory','socket',
    function($scope,Storage,$http,$state,$stateParams,$ionicHistory,socket){
    $scope.$on('$ionicView.beforeEnter',function() {
      $scope.user = Storage.get("userInfo");
      $scope.friendId = $stateParams.friendId;
      $scope.add = {
        backname:$scope.friendId,
        message:$scope.user.nickname
      };
    });

      $scope.addRequest = function(){
        socket.emit("add:friend",{userId:$scope.user.id,friendId:$scope.friendId,backname:$scope.add.backname,message:$scope.add.message});
        $state.go('tab.friends',{viewSource:"addFriend"});
      };

      $scope.goBack =function(){
        $ionicHistory.goBack();
      };

  }]);
