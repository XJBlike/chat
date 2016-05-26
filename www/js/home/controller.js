/**
 * Created by XJB11 on 2016/4/24 0024.
 */
//
CHAT.CONTROLLERS
  .controller('AbstractTabsCtrl',['$rootScope','$scope','Storage','$state','$ionicHistory','Message','socket',
    function($rootScope,$scope,Storage,$state,$ionicHistory,Message,socket){
      $scope.$on('$ionicView.beforeEnter',function(){
        $scope.isShowTabs = $state.is('tab.chat') ||
                            $state.is('tab.friends') ||
                            $state.is('tab.mine');
      if(!Storage.get("userInfo")&&!$state.is('tab.mine-information')){
          $state.go("tab.mine-login");
        }else{
        if($scope.isShowTabs){
          $ionicHistory.clearHistory();
        }
        if($ionicHistory.backView()==null&&!$scope.isShowTabs){
          $state.go('tab.friends');
        }
        if(!Storage.get("records")){
          Message.init();
        }
      }
      });

      socket.on("message:receive",function(data){
        var records = Storage.get("records");
        for(var i=0;i<records.length;i++){
          if(records[i].id == data.message.id){

          }
        }
      });
  }]);
