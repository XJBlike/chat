/**
 * Created by XJB11 on 2016/5/29 0029.
 */
CHAT.CONTROLLERS
    .controller('RecordCtrl',['$scope','$stateParams','$ionicHistory','Message','Storage','$ionicScrollDelegate','$state',
      function($scope,$stateParams,$ionicHistory,Message,Storage,$ionicScrollDelegate,$state){
        $scope.$on("$ionicView.beforeEnter",function(){
          $scope.friendId = $stateParams.friendId;
          $scope.img = $stateParams.img;
          $scope.record = Message.getMessageById($scope.friendId);
          $scope.user = Storage.get("userInfo");
          var viewScroll = $ionicScrollDelegate.$getByHandle('recordScroll');
          viewScroll.scrollBottom();
        });

        $scope.goBack = function(){
          $ionicHistory.goBack();
        };

        $scope.downloadRecord = function(){
          var forwardTo = $state.current.data.forwardTo.downloadRecord;
            $state.go(forwardTo[0],{friendId:$scope.friendId});
        };

        $scope.deleteRecord = function(){
          $scope.record.messages = [];
          Message.deleteMessageById($scope.friendId);
        };
      }])

.controller('DownloadRecordCtrl',['$scope','$stateParams','$ionicHistory','Storage','Message','socket',
  function($scope,$stateParams,$ionicHistory,Storage,Message,socket){
  $scope.$on("$ionicView.beforeEnter",function(){
    var friendId = $stateParams.friendId;
    var user = Storage.get("userInfo");
    $scope.fileName = "USER"+user.id+"("+friendId+").txt";
    var records = Storage.get("records");
    var myRecord = Message.getMessageById(friendId);
    var backname = myRecord.backname;
    var messages = [];
    if(myRecord){
      messages = myRecord.messages;
    }
    socket.emit("downloadRecord",{friendId:friendId,backname:backname,user:user,messages:messages});
  });

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
}]);
