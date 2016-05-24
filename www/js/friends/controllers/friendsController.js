/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
  .controller('FriendsCtrl',['$scope','Storage','$state','CommonMethods','$http','socket',
    function($scope,Storage,$state,CommonMethods,$http,socket){
         $scope.$on("$ionicView.beforeEnter",function(){
           $scope.initScope();
         });

      $scope.initScope = function(){
        $scope.userId = Storage.get("userInfo").id;
        socket.emit("friends",{id:$scope.userId});
        $scope.showFriendList = true;
        $scope.isShowImg =false;
      };
      socket.on("friends:success",function(data){
         $scope.friends = data.friends;
      });

      $scope.goFriendInfo = function(friend){
           $state.go('tab.friends-info',{friendId:friend.id});
      };
      $scope.changeShow = function(){
        $scope.showFriendList = !$scope.showFriendList;
      };
      $scope.changeShowImg =function(){
        $scope.isShowImg = !$scope.isShowImg;
      };

      $scope.goChat = function(friend){
          $state.go('tab.friends-chatDetail',{"messageId":friend.userId,backUp:friend.backUp,userName:friend.userName,img:friend.img});
      };

      $scope.goSearch = function(){
        $state.go('tab.friends-search');
      };

      $scope.removeFriend = function(friend){
        for(var i=0;i<$scope.friends.length;i++){
          if($scope.friends[i].id == friend.id){
            $scope.friends.splice(i,1);
          }
        }
        socket.emit("remove:friend",{friend:friend,userId:$scope.userId});
      };
  }]);

