/**
 * Created by XJB11 on 2016/5/30 0030.
 */
CHAT.CONTROLLERS
    .controller("ModifyPwdCtrl",['$state','$scope','Storage','$ionicHistory','CommonMethods','$ionicPopup','socket',
      function($state,$scope,Storage,$ionicHistory,CommonMethods,$ionicPopup,socket){
        $scope.$on("$ionicView.beforeEnter",function(){
          $scope.user = Storage.get("userInfo");
          $scope.user.oldPwd = null;
          $scope.user.newPwd = null;
          $scope.user.newPwdConfirm = null;
          $scope.passType1 = 'password';
          $scope.passType2 = 'password';
        });

        $scope.submit = function(){
          if($scope.user.oldPwd != $scope.user.password){
            CommonMethods.showAlert("原密码输入错误！");
          }else{
            if($scope.user.newPwd == $scope.user.oldPwd){
              CommonMethods.showAlert("新密码与原密码相同！");
            }else{
              if($scope.user.newPwd == $scope.user.newPwdConfirm){
                socket.emit("modifyPassword",{userId:$scope.user.id,newPwd:$scope.user.newPwd});
              }
            }
          }
        };

        socket.on("modifyPassword:success",function(data){
          $ionicPopup.alert({
            title: "提示",
            template:"<p style='background-color: #EDEDED;margin: 10px;text-align: center;font-size: 16px;'>"+data.info+"</p>",
            okText: "确定"
          }).then(function() {
            $scope.reLogin();
          });
        });

        $scope.reLogin = function(){
          var userInfo = Storage.get("userInfo");
          userInfo.password = $scope.newPwd;
          var userId = userInfo.id;
          var allRecords = Storage.get("allRecords");
          var records = Storage.get("records");
          allRecords[userId] = records;
          Storage.set("allRecords",allRecords);
          Storage.remove("userInfo");
          Storage.remove("records");
          Storage.remove("friendInfo");
          socket.emit("logout",{userInfo:userInfo});
          $state.go("tab.mine-login");
        };

        $scope.goBack = function(){
          $ionicHistory.goBack();
        };

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
    }]);
