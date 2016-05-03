/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
  .controller('FriendsCtrl',['$scope','Storage','$state','CommonMethods','$http',
    function($scope,Storage,$state,CommonMethods,$http){
         $scope.$on("$ionicView.loaded",function(){
           $scope.initScope();
         });

      $scope.initScope = function(){
        $http.get("../../../data/json/friends.json").success(function(data){
          $scope.friends = data.friends;
        });
        $scope.showFriendList = true;
      };

      $scope.goFriendInfo = function(friend){
           CommonMethods.showToast(friend.description);
      };
      $scope.changeShow = function(){
        $scope.showFriendList = !$scope.showFriendList;
      };

      $scope.goSearch = function(){
        $state.go('tab.friends-search');
      }
  }])
  .controller('FriendInfoCtrl',['$scope','Storage','$state',
    function($scope,Storage,$state){

    }]);

