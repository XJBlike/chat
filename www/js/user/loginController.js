/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
 .controller('LoginCtrl',['$scope','Storage','$rootScope','CommonMethods','$ionicHistory','SqliteOperationService','$state','$http','socket',
   function($scope,Storage,$rootScope,CommonMethods,$ionicHistory,SqliteOperationService,$state,$http,socket){
     $scope.$on("$ionicView.loaded",function(){
       $ionicHistory.clearHistory();
       if(Storage.get("userInfo")){
         $state.go('tab.mine');
       }
       $scope.user = {
         userId:null,
         password:null,
         passwordConfirm:null
       };
       $scope.type={
         login:true
       };
       $scope.passType1 = 'password';
       $scope.passType2 = 'password';
       $scope.isRegister = false;
     });

     $scope.modifyPassType = function(num){
       if(num == 1){
         if($scope.passType1 == 'text'){
           $scope.passType1 = 'password';
         }else{
           $scope.passType1 = 'text';
         }
       }else{
         if($scope.passType2 == 'text'){
           $scope.passType2 = 'password';
         }else{
           $scope.passType2 = 'text';
         }
       }
     };

     $scope.changeRequest = function(){
       $scope.isRegister = !$scope.isRegister;
     };

     $scope.userLogin = function(){
          socket.emit('login',$scope.user);
     };
     $scope.userRegister = function(){

     };
     socket.on('login:success',function(data){
       Storage.set("userInfo",data.userInfo);
       $state.go("tab.mine");
     });

     socket.on('login:fail',function(data){
       CommonMethods.showToast(data.err);
     })
   }]);


