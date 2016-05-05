/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
 .controller('LoginCtrl',['$scope','Storage','$rootScope','CommonMethods','$ionicHistory','SqliteOperationService','$state',
   function($scope,Storage,$rootScope,CommonMethods,$ionicHistory,SqliteOperationService,$state){
     $ionicHistory.clearHistory();
     $scope.goRegister = function(){
       //TODO 这边跳转不过去，url变化，模板似乎并没有被加载
       $state.go('tab.mine-register');
     }
   }])

 .controller('RegisterCtrl',['$scope','Storage','$rootScope','CommonMethods','$ionicHistory',
 function($scope,Storage,$rootScope,CommonMethods,$ionicHistory){
   $scope.$on("$ionicView.loaded",function(){
     $ionicHistory.clearHistory();
   });
   $scope.goLogin = function(){
     $state.go('tab.mine-login');
   };
   }]);
