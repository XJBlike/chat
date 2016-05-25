/**
 * Created by XJB11 on 2016/5/26 0026.
 */
CHAT.CONTROLLERS
     .controller('UserInfoCtrl',['$scope','$state','$stateParams','$ionicHistory',
       function($scope,$state,$stateParams,$ionicHistory){
            $scope.$on('$ionicView.beforeEnter',function(){
              $scope.user = $stateParams.user;
            });

            $scope.goBack = function(){
              $ionicHistory.goBack();
            };

            $scope.addFriend = function(){
              $state.go('tab.friends-add',{"friendId":$scope.user.id});
            }
     }]);
