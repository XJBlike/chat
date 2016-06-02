/**
 * Created by XJB11 on 2016/4/29 0029.
 */
CHAT.CONTROLLERS
  .controller('ChangeDescCtrl',['$scope','Storage','$ionicHistory','$state','CommonMethods','socket',
    function($scope,Storage,$ionicHistory,CommonMethods,$state,socket){
      var user = $scope.user = {};

      $scope.$on('$ionicView.beforeEnter',function(){
        $scope.description = $state.params.description;
        user.description = $scope.description;
      });
      $scope.saveChange = function(){
        var userInfo = Storage.get("userInfo");
        if(!$scope.user.description.length){
          CommonMethods.showAlert("签名不能为空！");
        }else{
          userInfo.description = user.description;
          Storage.set("userInfo",userInfo);
          socket.emit("changeDesc",{userInfo:userInfo});
          $ionicHistory.goBack();
        }
      };
      $scope.showLeftLength = function(){
        var desc = user.description;
        $scope.leftLength = 12 - desc.length;
      };
      $scope.goBack =function(){
        $ionicHistory.goBack();
      };
    }])

  .controller('ChangeLocationCtrl',['$scope','Storage','$ionicHistory','$state','socket','CommonMethods',
  function($scope,Storage,$ionicHistory,$state,socket,CommonMethods){
    var user = $scope.user = {};

    $scope.$on('$ionicView.beforeEnter',function(){
      $scope.location = $state.params.location;
      user.location = $scope.location;
    });

    $scope.saveChange = function(){
      var userInfo = Storage.get("userInfo");
      if(!$scope.user.location.length){
        CommonMethods.showAlert("地区不能为空！");
      }else{
        userInfo.location = user.location;
        Storage.set("userInfo",userInfo);
        socket.emit("changeLocation",{userInfo:userInfo});
        $ionicHistory.goBack();
      }
    };

    $scope.showLeftLength = function(){
      var location = user.location;
      $scope.leftLength = 12 - location.length;
    };
    $scope.goBack =function(){
      $ionicHistory.goBack();
    };
  }])
  .controller('ChangeNameCtrl',['$scope','Storage','$ionicHistory','$state','socket','CommonMethods',
    function($scope,Storage,$ionicHistory,$state,socket,CommonMethods){
      var user = $scope.user = {};

      $scope.$on('$ionicView.beforeEnter',function(){
        $scope.nickname = $state.params.nickname;
        user.nickname = $scope.nickname;
      });

      $scope.saveChange = function(){
        var userInfo = Storage.get("userInfo");
        if(!$scope.user.nickname.length){
          CommonMethods.showAlert("昵称不能为空！");
        }else{
          userInfo.nickname = user.nickname;
          Storage.set("userInfo",userInfo);
          socket.emit("changeNickname",{userInfo:userInfo});
          $ionicHistory.goBack();
        }
      };



      $scope.showLeftLength = function(){
        var nickname = user.nickname;
        $scope.leftLength = 12 - nickname.length;
      };

      $scope.goBack =function(){
        $ionicHistory.goBack();
      };
    }]);
