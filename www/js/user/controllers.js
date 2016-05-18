/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
 .controller('LoginCtrl',['$scope','Storage','$rootScope','CommonMethods','$ionicHistory','SqliteOperationService','$state','$http','socket',
   function($scope,Storage,$rootScope,CommonMethods,$ionicHistory,SqliteOperationService,$state,$http,socket){
     $scope.$on("$ionicView.loaded",function(){
       $ionicHistory.clearHistory();
       $scope.user = {
         username:null,
         password:null
       };
     });
     $scope.goRegister = function(){
       //TODO 这边跳转不过去，url变化，模板似乎并没有被加载
       $state.go('tab.mine-register');
     };

     $scope.userLogin = function(){
          CommonMethods.showToast($scope.user.username);
     };
   }])

 .controller('RegisterCtrl',['$scope','Storage','$rootScope','CommonMethods','$ionicHistory','$http',
 function($scope,Storage,$rootScope,CommonMethods,$ionicHistory,$http){
   $scope.$on("$ionicView.loaded",function(){
     $ionicHistory.clearHistory();
     $http.get("https://https://windchat.wilddogio.com/users").success(function(data){
       console.log(data);
     })
   });
   $scope.goLogin = function(){
     $state.go('tab.mine-login');
   };
   }]);
