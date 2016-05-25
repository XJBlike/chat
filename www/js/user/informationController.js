/**
 * Created by XJB11 on 2016/5/25 0025.
 */
/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
  .controller('InformationCtrl',['$scope','Storage','$rootScope','CommonMethods','$ionicHistory','$state','socket','$stateParams','$ionicPopup','$timeout',
    function($scope,Storage,$rootScope,CommonMethods,$ionicHistory,$state,socket,$stateParams,$ionicPopup,$timeout){
      $scope.$on("$ionicView.beforeEnter",function(){
        if(Storage.get("userInfo")){
          $state.go('tab.mine');
        }
        $scope.user = {
          id:$stateParams.user.userId,
          password:$stateParams.user.password,
          nickname:null,
          sex:'男',
          location:null,
          description:null
        };
        $scope.user.img = $scope.randomImg();
      });

      $scope.register = function(){
          socket.emit("register",{user:$scope.user});
          Storage.set("userInfo",$scope.user);
          socket.on("register:success",function(data){
            var tipPopup = $ionicPopup.alert({
              title:"提示",
              template:"<ion-item style='background-color: #EDEDED'><span style='margin-left: 25%;font-size: 16px;'>"
              + data.info
              + "</span></ion-item>",
              okText: "确定"
            });
          });
          $state.go('tab.mine');
      };

     $scope.randomImg = function(){
        return Math.ceil(Math.random()*28);
      };
      $scope.changeImg = function(){
        $scope.user.img = ($scope.user.img+4)%28;
      };
      $scope.sexPop = function(){
        $scope.sexPopup = $ionicPopup.show({
          title: "性别",
          templateUrl: "templates/mine/sexPopup.html",
          scope: $scope
        });
      };
      $scope.setSex = function(sex){
        $scope.user.sex = sex;
        $scope.sexPopup.close();
      };

      $scope.goBack =function(){
        $ionicHistory.goBack();
      };
    }]);


