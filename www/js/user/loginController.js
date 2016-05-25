/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
 .controller('LoginCtrl',['$scope','Storage','$rootScope','CommonMethods','$ionicHistory','SqliteOperationService','$state','$ionicPopup','socket',
   function($scope,Storage,$rootScope,CommonMethods,$ionicHistory,SqliteOperationService,$state,$ionicPopup,socket){
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
       $scope.userList = [];
       socket.emit("users",{userId:$scope.user.userId});
       socket.on("users:success",function(data) {
         $scope.userList = data.users;
       });
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
           if($scope.user.password !== $scope.user.passwordConfirm){
             var passwordPopup = $ionicPopup.alert({
               title:"提示",
               template:"<ion-item style='background-color: #EDEDED'><span style='margin-left: 15%;font-size: 16px;'>两次输入密码不一致！</span></ion-item>",
               okText: "确定"
             });
           }else{
               for(var i=0;i<$scope.userList.length;i++){
                 if($scope.userList[i].id === $scope.user.userId){
                   var tipPopup = $ionicPopup.alert({
                     title:"提示",
                     template:"<ion-item style='background-color: #EDEDED'><span style='margin-left: 30%;font-size: 16px;'>此id已经存在！</span></ion-item>",
                     okText: "确定"
                   });
                   break;
                 }
               }
               if(i == $scope.userList.length){
                 $state.go('tab.mine-information',{user:$scope.user});
               }
             }
     };

     socket.on('login:success',function(data){
       Storage.set("userInfo",data.userInfo);
       $state.go("tab.mine");
     });

     socket.on('login:fail',function(data){
       CommonMethods.showToast(data.err);
     })
   }]);


