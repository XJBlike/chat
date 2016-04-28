/**
 * Created by XJB11 on 2016/4/24 0024.
 */
CHAT.CONTROLLERS
  .controller('ChatCtrl', function($scope, Chats) {
    $scope.$on("$ionicView.loaded",function(){
      $scope.chats = Chats.all();
    });

    $scope.removeChat = function(chat) {
        chat.showChat = false;
       Chats.remove(chat);
    };
  });
