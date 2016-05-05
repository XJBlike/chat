/**
 * Created by XJB11 on 2016/5/5 0005.
 */
CHAT.CONTROLLERS
  .controller('SearchResultCtrl',['$scope','Search','$state','$stateParams','$ionicHistory','CommonMethods',
    function($scope,Search,$state,$stateParams,$ionicHistory,CommonMethods){
          $scope.$on('$ionicView.loaded',function(){
            $scope.search = {};
            $scope.search.keyword = $stateParams.keyword;
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

      $scope.addFriend = function(user){
        $state.go('tab.friends-add',{"userId":user.userId});
      }
  }]);
