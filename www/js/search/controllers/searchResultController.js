/**
 * Created by XJB11 on 2016/5/5 0005.
 */
CHAT.CONTROLLERS
  .controller('SearchResultCtrl',['$scope','Search','$state','$stateParams','$ionicHistory','CommonMethods','socket','Storage',
    function($scope,Search,$state,$stateParams,$ionicHistory,CommonMethods,socket,Storage){
          $scope.$on('$ionicView.beforeEnter',function(){
            $scope.search = {};
            $scope.search.keyword = $stateParams.keyword;
            $scope.userId = Storage.get("userInfo").id;
            if($scope.search.keyword){
              $scope.result = Search.searchUser($scope.search.keyword);
              Search.addUserSearchHistory($scope.search.keyword);
            }
          });

          $scope.goBack = function(){
            $ionicHistory.goBack();
          };

      $scope.goChat = function(friend){
        $state.go('tab.friends-chatDetail',{"messageId":friend.userId,backup:friend.backUp,userName:friend.userName,img:friend.img});
      };

      $scope.goFriendInfo = function(friend){
        CommonMethods.showToast(friend.description);
      };

      $scope.searchUser = function(){
        if($scope.search.keyword){
          $scope.result = Search.searchUser($scope.search.keyword);
          Search.addUserSearchHistory($scope.search.keyword);
        }
      };

      $scope.removeFriend = function(friend){
        for(var i=0;i<$scope.result.friends.length;i++){
          if($scope.result.friends[i].id == friend.id){
            $scope.result.friends.splice(i,1);
          }
        }
        socket.emit("remove:friend",{friend:friend,userId:$scope.userId});
      };

      $scope.addFriend = function(user){
        $state.go('tab.friends-add',{"friendId":user.id});
      }
  }]);
