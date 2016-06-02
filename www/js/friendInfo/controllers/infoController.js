/**
 * Created by XJB11 on 2016/5/24 0024.
 */
CHAT.CONTROLLERS
   .controller("InfoCtrl",['$scope','$state','$stateParams','$ionicHistory','Storage','socket',
     function($scope,$state,$stateParams,$ionicHistory,Storage,socket){
        $scope.$on("$ionicView.beforeEnter",function(){
          var viewSource = $stateParams.viewSource;
          $scope.showChatButton = (viewSource !="chatDetail");
          $scope.friendId = $stateParams.friendId;
          $scope.userId = Storage.get("userInfo").id;
          $scope.friend = $scope.getFriendInfo($scope.friendId);
        });

       $scope.getFriendInfo = function(friendId){
         var friendInfo = Storage.get("friendInfo");
         if(friendInfo.length){
           for(var i=0;i<friendInfo.length;i++){
             if(friendInfo[i].id ==friendId){
               return friendInfo[i];
             }
           }
         }
         return null;
       };

       $scope.goBack =function(){
         $ionicHistory.goBack();
       };
       $scope.goModifyBackname = function(){
         $state.go($state.current.data.forwardTo.modifyBack[0],{friend:$scope.friend,userId:$scope.userId});
       };
       $scope.goChat = function(friend){
         $state.go('tab.friends-chatDetail',{"id":friend.id,backname:friend.backname,nickname:friend.nickname,img:friend.img});
       };
   }])

.controller('ModifyBackCtrl',['$scope','$ionicHistory','socket','$state','$stateParams','Storage','CommonMethods',
  function($scope,$ionicHistory,socket,$state,$stateParams,Storage,CommonMethods){
    $scope.$on("$ionicView.beforeEnter",function(){
      $scope.friend = $stateParams.friend;
      $scope.userId = $stateParams.userId;
    });

    $scope.goBack = function(){
      $ionicHistory.goBack();
    };

    $scope.saveChange = function(){
      if(!$scope.friend.backname.length){
        CommonMethods.showAlert("备注不能为空！");
      }else{
        socket.emit("backnameChange",{friend:$scope.friend,userId:$scope.userId});
        $scope.modifyBackname($scope.friend);
        $ionicHistory.goBack();
      }
    };

    $scope.showLeftLength = function(){
      var backname = $scope.friend.backname;
      $scope.leftLength = 12 - backname.length;
    };

    $scope.modifyBackname = function(friend){
      var friendInfo = Storage.get("friendInfo");
      var records = Storage.get("records");
      var a = false;
      var b =false;
      if(friendInfo.length){
        for(var i=0;i<friendInfo.length;i++){
          if(friendInfo[i].id ==friend.id){
            friendInfo[i].backname = friend.backname;
            Storage.set("friendInfo",friendInfo);
            a=true;
            break;
          }
        }
        for(var j=0;j<records.length;j++){
          if(records[j].id == friend.id){
            records[j].backname = friend.backname;
            Storage.set("records",records);
            b=true;
            return a&b;
          }
        }
        return a;
      }
      return false;
    };
}]);
