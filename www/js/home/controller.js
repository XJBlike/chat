/**
 * Created by XJB11 on 2016/4/24 0024.
 */
//
CHAT.CONTROLLERS
  .controller('AbstractTabsCtrl',['$rootScope','$scope','Storage','$state','$ionicHistory',
    function($rootScope,$scope,Storage,$state,$ionicHistory){
      $scope.$on('$ionicView.beforeEnter',function(){
        $scope.isShowTabs = $state.is('tab.chat') ||
                            $state.is('tab.friends') ||
                            $state.is('tab.mine');
      //if(!Storage.get("userInfo")){
      //    var loginUrl = $state.current.data.forwardTo.login[0];
      //    $state.go(loginUrl);
      //  }
        if($scope.isShowTabs){
          $ionicHistory.clearHistory();
        }
      });
  }]);
