/**
 * Created by XJB11 on 2016/4/26 0026.
 */
CHAT.CONTROLLERS
  .controller('FriendsCtrl',['$scope','Storage','$state','CommonMethods',
    function($scope,Storage,$state,CommonMethods){
         $scope.$on("$ionicView.loaded",function(){
           $scope.initScope();
         });

      $scope.initScope = function(){
        $scope.friends = [
          {
            "id": "10000",
            "name": "鲁棒性的男人",
            "img": "../../../img/head/3.png",
            "description": "我是徐佳宝",
          },
          {
            "id": "10001",
            "name": "日乐购",
            "img": "../../../img/head/4.png",
            "description": "日了日了日乐购",
          },
          {
            "id": "10002",
            "name": "蛤蛤",
            "img": "../../../img/head/5.png",
            "description": "too young too simple，sometimes naive!",
          },
          {
            "id": "10003",
            "name": "庆丰包子铺",
            "img": "../../../img/head/6.png",
            "description": "维尼套餐二十元一份！",
            "showChat": true
          },
          {
            "id": "10004",
            "name": "喵主席",
            "img": "../../../img/head/7.png",
            "description": "友谊的小船说翻就翻",
          },
          {
            "id": "10005",
            "name": "新日暮里之王",
            "img": "../../../img/head/8.png",
            "description": "乖乖站好！",
          },
          {
            "id": "10006",
            "name": "duang龙",
            "img": "../../../img/head/10.png",
            "description": "头发很黑很油很亮，duang！",
          },
          {
            "id": "10007",
            "name": "元首",
            "img": "../../../img/head/17.png",
            "description": "这星期，我到河北省来",
          }
        ];
      };
      $scope.goFriendInfo = function(friend){
           CommonMethods.showToast(friend.description);
      }
  }])
  .controller('FriendInfoCtrl',['$scope','Storage','$state',
    function($scope,Storage,$state){

    }])
  .controller('SearchCtrl',['$scope','Storage','$state',
  function($scope,Storage,$state){

  }])
  .controller('SearchResultCtrl',['$scope','Storage','$state',
    function($scope,Storage,$state){

  }])
