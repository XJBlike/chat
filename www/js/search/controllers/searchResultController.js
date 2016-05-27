/**
 * Created by XJB11 on 2016/5/5 0005.
 */
CHAT.CONTROLLERS
  .controller('SearchResultCtrl',['$scope','Search','$state','$stateParams','$ionicHistory','CommonMethods','socket','Storage','$ionicPopup','$timeout',
    function($scope,Search,$state,$stateParams,$ionicHistory,CommonMethods,socket,Storage,$ionicPopup,$timeout){
          $scope.$on('$ionicView.beforeEnter',function(){
            $scope.search = {};
            $scope.search.keyword = $stateParams.keyword;
            $scope.id = Storage.get("userInfo").id;
            if($scope.search.keyword){
              $scope.result = Search.searchUser($scope.search.keyword);
              Search.addUserSearchHistory($scope.search.keyword);
            }
          });

          $scope.goBack = function(){
            $ionicHistory.goBack();
          };

      $scope.goChat = function(friend){
        $state.go('tab.friends-chatDetail',{"messageId":friend.id,backname:friend.backname,nickname:friend.nickname,img:friend.img});
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
        if(friend.id=='111111'){
          CommonMethods.showAlert("建议不要删除客服！");
        }
        else{
          for(var i=0;i<$scope.result.friends.length;i++){
            if($scope.result.friends[i].id == friend.id){
              $scope.result.friends.splice(i,1);
            }
          }
          socket.emit("remove:friend",{friend:friend,userId:$scope.id});
        }
      };

      $scope.addFriend = function(user){
        $state.go('tab.friends-add',{"friend":user});
      };

      $scope.goFriendInfo = function(friend){
        $state.go('tab.friends-info',{friendId:friend.id,viewSource:"search"});
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

      $scope.userPop = function(user){
        $scope.dogeUser = user;
        $scope.userPopup = $ionicPopup.show({
          templateUrl: "templates/search/userPopup.html",
          scope: $scope
        });
        $timeout(function(){
          $scope.userPopup.close();
        },3000);
      };

      $scope.userChoice = function(choice){
        if(!choice){
          $scope.goUserInfo($scope.dogeUser);
        }else{
          $scope.addFriend($scope.dogeUser);
        }
        $scope.userPopup.close();
      };

      $scope.goUserInfo = function(user){
        $state.go('tab.friends-userInfo',{user:user});
      };
  }]);
