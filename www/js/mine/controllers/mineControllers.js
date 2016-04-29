/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
  .controller('MineCtrl',['$scope','CommonMethods','Storage','$state',
    function($scope,CommonMethods,Storage,$state){
      $scope.goLogin = function(){
        $state.go('tab.mine-login');
      };

      $scope.goAccount = function(){
        $state.go('tab.mine-account');
      }
  }])
  .controller('AccountCtrl',['$scope','CommonMethods','Storage','$state',
    function($scope,CommonMethods,Storage,$state){
          $scope.$on('$ionicView.beforeEnter',function(){
            var userInfo = Storage.get("userInfo");
            userInfo.img = "../../../img/head/" + userInfo.img + ".png";
            $scope.account = userInfo;
          });

          $scope.changeName = function(){
              $state.go('tab.mine-changeName',{"userName":$scope.account.userName});
          };
          $scope.changeDesc = function(){
              $state.go('tab.mine-changeDesc',{"description":$scope.account.description});
          };
    }]);
