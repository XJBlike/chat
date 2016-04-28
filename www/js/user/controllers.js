/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
 .controller('LoginCtrl',['$scope','Storage','$rootScope','CommonMethods','$ionicHistory','SqliteOperationService','$state',
   function($scope,Storage,$rootScope,CommonMethods,$ionicHistory,SqliteOperationService,$state){
     $scope.$on("$ionicView.beforeEnter",function(){
       $ionicHistory.clearHistory();
     });
     $scope.goRegister = function(){
       $state.go('tab.mine-register');
     }
   }])

 .controller('RegisterCtrl',['$scope','Storage','$rootScope','CommonMethods','$ionicHistory',
 function($scope,Storage,$rootScope,CommonMethods,$ionicHistory){
   $scope.$on("$ionicView.beforeEnter",function(){
     console.log("register");
   });
   $scope.goLogin = function(){
     $state.go('tab.mine-login');
   }
   }]);
