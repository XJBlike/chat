/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
  .controller('MineCtrl',['$scope','CommonMethods','Storage','$state','$http',
    function($scope,CommonMethods,Storage,$state,$http){
      $scope.goLogin = function(){
        $state.go('tab.mine-login');
      };

      $scope.goAccount = function(){
        $state.go('tab.mine-account');
      };

      $scope.goAboutApp = function(){
        $state.go('tab.mine-about');
      };
  }])
  .controller('AccountCtrl',['$scope','CommonMethods','Storage','$state','$ionicPopup','$http','$ionicHistory',
    function($scope,CommonMethods,Storage,$state,$ionicPopup,$http,$ionicHistory){
          $scope.$on('$ionicView.beforeEnter',function(){
            var userInfo = {};
            $http.get("../../../data/json/userInfo.json").success(function(data){
              $scope.readResult = data.userInfo;
            }).then(function(){
               userInfo = $scope.readResult;
              $scope.account = userInfo;
              $scope.account.img = "../../../img/head/" + userInfo.img + ".png";
            });
           //TODO 最终完成为读取服务器上的json文件，改变时post到服务器。

           // var userInfo = Storage.get("userInfo");

          });

          $scope.changeName = function(){
              $state.go('tab.mine-changeName',{"userName":$scope.account.userName});
          };
          $scope.changeDesc = function(){
              $state.go('tab.mine-changeDesc',{"description":$scope.account.description});
          };

          $scope.selectSex = function(){
            //这里通过$ionicPopup.show()方法创建了一个自定义的popup
            $scope.sexPopup = $ionicPopup.show({
              title: "性别",
              templateUrl: "templates/mine/sexPopup.html",
              scope: $scope
            });
          };
          $scope.setSex = function(sex){
            var userInfo = Storage.get("userInfo");
            userInfo.sex = sex;
            $scope.account.sex = sex;
            Storage.set("userInfo",userInfo);
            $scope.sexPopup.close();
          };
          $scope.changeLocation = function(){
            $state.go('tab.mine-changeLocation',{"location":$scope.account.location});
          };

      $scope.goBack =function(){
        $ionicHistory.goBack();
      };
    }])

  .controller('AboutCtrl',['$scope','$http','$ionicPopup','$timeout','$ionicHistory',
    function($scope,$http,$ionicPopup,$timeout,$ionicHistory){
           $scope.$on("$ionicView.beforeEnter",function(){
             $http.get("../../../data/json/conformation.json").success(function(data){
               $scope.appName = data.appName;
               $scope.appVersion = data.appVersion;
               $scope.appPlatform = data.appPlatform;
               $scope.author = data.author;
               $scope.contact = data.contact;
             })
           });

      $scope.showContact = function(){
        var contactPopup = $ionicPopup.alert({
           title: "联系方式",
           template: "<ion-list><ion-item>QQ:<span style='text-align: right;padding-left: 70px;'>"
                     + $scope.contact.QQ
                     + "</span></ion-item><ion-item>Tel:<span style='text-align: right;padding-left: 70px;'>"
                     + $scope.contact.Tel
                     + "</span></ion-item></ion-list>",
          okText: "naive!"
        });
        $timeout(function(){
          contactPopup.close();
        },500);
      };

      $scope.goBack =function(){
        $ionicHistory.goBack();
      };
  }]);
