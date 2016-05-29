/**
 * Created by XJB11 on 2016/5/6 0006.
 */
CHAT.CONTROLLERS
  .controller('AddFriendCtrl',['$scope','Storage','$http','$state','$stateParams','$ionicHistory','socket',
    function($scope,Storage,$http,$state,$stateParams,$ionicHistory,socket){
    $scope.$on('$ionicView.beforeEnter',function() {
      $scope.user = Storage.get("userInfo");
      $scope.friend = $stateParams.friend;
      $scope.add = {
        backname:$scope.friend.id,
        message:$scope.user.nickname
      };
    });

      $scope.addRequest = function(){
        socket.emit("add:friend",{userId:$scope.user.id,friendId:$scope.friend.id,backname:$scope.add.backname,message:$scope.add.message});
        var friendInfo = Storage.get('friendInfo');
        var friend = $scope.friend;
        friend.backname = $scope.add.backname;
        friendInfo.push(friend);
        Storage.set("friendInfo",friendInfo);
        $state.go('tab.friends',{viewSource:"addFriend"});
      };

      $scope.goBack =function(){
        $ionicHistory.goBack();
      };

  }]);
