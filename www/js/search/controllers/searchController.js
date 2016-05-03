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
            $scope.tipResult = Search.getUserSearchHistory();
        });

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
}]);
