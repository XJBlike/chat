/**
 * Created by XJB11 on 2016/4/29 0029.
 */
CHAT.CONTROLLERS
  .controller('ChangeDescCtrl',['$scope','Storage','$ionicHistory','$state',
    function($scope,Storage,$ionicHistory,$state){
      var user = $scope.user = {};

      $scope.$on('$ionicView.beforeEnter',function(){
        $scope.description = $state.params.description;
        user.description = $scope.description;
      });
      $scope.saveChange = function(){
        var userInfo = Storage.get("userInfo");
        userInfo.description = user.description;
        Storage.set("userInfo",userInfo);
        $ionicHistory.goBack();
      };
      $scope.showLeftLength = function(){
        var desc = user.description;
        $scope.leftLength = 12 - desc.length;
      };
    }])

  .controller('ChangeNameCtrl',['$scope','Storage','$ionicHistory','$state',
  function($scope,Storage,$ionicHistory,$state){
    var user = $scope.user = {};

    $scope.$on('$ionicView.beforeEnter',function(){
      $scope.userName = $state.params.userName;
      user.userName = $scope.userName;
    });

    $scope.saveChange = function(){
      var userInfo = Storage.get("userInfo");
      userInfo.userName = user.userName;
      Storage.set("userInfo",userInfo);
      $ionicHistory.goBack();
    };

    $scope.showLeftLength = function(){
      var userName = user.userName;
      $scope.leftLength = 10 - userName.length;
    };
  }]);
