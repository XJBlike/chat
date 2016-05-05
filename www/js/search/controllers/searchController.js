/**
 * Created by XJB11 on 2016/5/4 0004.
 */
CHAT.CONTROLLERS
.controller('SearchCtrl',['$scope','Search','$state','$ionicHistory',
  function($scope,Search,$state,$ionicHistory){
        $scope.$on('$ionicView.beforeEnter',function(){
          $scope.results = {};
          $scope.search = {};
          $scope.focus=true;
          $scope.search = {};
            $scope.tipResult = Search.getUserSearchHistory();
        });

    $scope.goBack = function(){
      $ionicHistory.goBack();
    };

    $scope.historyClick = function(keyword){
      if(keyword){
        $state.go('tab.friends-searchResult',{"keyword":keyword});
      }
    };

    $scope.clearSearchHistory = function(){
      $scope.tipResult = [];
      Search.clearUserSearchHistory();
    };

    $scope.searchUser = function(){
      if($scope.search.keyword){
        $state.go('tab.friends-searchResult',{"keyword":$scope.search.keyword});
      }
    };
}]);
