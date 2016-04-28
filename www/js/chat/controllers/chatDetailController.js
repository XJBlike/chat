/**
 * Created by XJB11 on 2016/4/24 0024.
 */
CHAT.CONTROLLERS
 .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});
