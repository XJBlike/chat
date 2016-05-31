/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
  .controller('FriendsCtrl',['$scope','Storage','$state','CommonMethods','$stateParams','socket','$ionicPopup','$timeout',
    function($scope,Storage,$state,CommonMethods,$stateParams,socket,$ionicPopup,$timeout){
         $scope.$on("$ionicView.beforeEnter",function(){
           $scope.initScope();
         });

      $scope.initScope = function(){
        $scope.user = Storage.get("userInfo");
        $scope.friends = Storage.get("friendInfo");
        $scope.showFriendList = true;
        $scope.isShowImg =false;
      };


      $scope.goFriendInfo = function(friend){
           $state.go('tab.friends-info',{friendId:friend.id,viewSource:"friendList"});
      };
      $scope.changeShow = function(){
        $scope.showFriendList = !$scope.showFriendList;
      };
      $scope.changeShowImg =function(){
        $scope.isShowImg = !$scope.isShowImg;
      };

      $scope.friendPop = function(friend){
        $scope.currentFriend = friend;
        $scope.friendPopup = $ionicPopup.show({
          templateUrl: "templates/friends/friendPopup.html",
          scope: $scope
        });
        $timeout(function(){
          $scope.friendPopup.close();
        },3000);
      };

      $scope.friendChoice = function(choice){
        if(!choice){
          $scope.goChat($scope.currentFriend);
        }else if(choice == 1){
          $scope.goFriendInfo($scope.currentFriend);
        }else{
          $scope.removeFriend($scope.currentFriend);
        }
        $scope.friendPopup.close();
      };

      $scope.goChat = function(friend){
          $state.go('tab.friends-chatDetail',{id:friend.id});
      };

      $scope.goSearch = function(){
        $state.go('tab.friends-search');
      };

      $scope.removeFriend = function(friend){
         var friendInfo = Storage.get("friendInfo");
          for(var i=0;i<$scope.friends.length;i++){
            if($scope.friends[i].id == friend.id){
              $scope.friends.splice(i,1);
            }
          }
        for(var j=0;i<friendInfo.length;j++){
          if(friendInfo[j].id == friend.id){
            friendInfo.splice(j,1);
            Storage.set("friendInfo",friendInfo);
          }
        }
          socket.emit("remove:friend",{friend:friend,userId:$scope.user.id});
      };
  }]);

