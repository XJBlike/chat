/**
 * Created by XJB11 on 2016/5/4 0004.
 */

CHAT.SERVICES
  .service('Search',['CommonMethods','Storage','$http','socket',
    function(CommonMethods,Storage,$http,socket){
      var result = {
        "friends":[],
        "users": []
      };
      var userId = Storage.get("userInfo").id;
      //查询要添加的记录是否在数组中
      this.isEleInArray = function (ele, arr) {
        var find = false;
        angular.forEach(arr, function (data) {
          if (data == ele) {
            find = true;
          }
        });
        return find;
      };

      this.isUserInFriends = function(user,friends){
        var find = false;
        angular.forEach(friends,function(data){
          if(data.userId == user.userId){
            find = true;
          }
        });
        return find;
      };

      this.searchUser = function(keyword){
        socket.emit('searchFriends',{keyword:keyword,userId:userId});
        socket.emit('searchUsers',{keyword:keyword,userId:userId});
        socket.on("searchFriends:success",function(data){
          result.friends = data.friends;
        });
        socket.on("searchUsers:success",function(data){
          result.users = data.users;
        });
        return result;
      };


      /**
       * 添加搜索记录
       * @param searchText
       */
      this.addUserSearchHistory = function (searchText) {
        var userHistory = Storage.get("userHistory");
        if (!userHistory) {
          userHistory = [];
        }
        if (searchText) {
          userHistory.push(searchText);
        }
        Storage.set("userHistory", userHistory);
      };

      this.getUserSearchHistory = function () {
        var userHistory = Storage.get("userHistory");
        var reverseArr = [];
        userHistory = (!userHistory) ? []:userHistory.reverse();
        for (var arr in userHistory) {
          if (!this.isEleInArray(userHistory[arr], reverseArr)) {
            reverseArr.push(userHistory[arr]);
            if (reverseArr.length >= 5) {
              break;
            }
          }
        }
        return reverseArr;
      };

      this.clearUserSearchHistory = function () {
        Storage.set("userHistory", []);
      };
    }]);




