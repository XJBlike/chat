/**
 * Created by XJB11 on 2016/5/4 0004.
 */

CHAT.SERVICES
  .service('Search',['CommonMethods','SearchBuffer','Storage',
    function(CommonMethods,SearchBuffer,Storage){

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
    }])


  .factory('SearchBuffer',function(){
    var SearchBuffer = [];
    return{
      add: function(keyWord,data){
        var searchResult = {
          "keyWord":keyWord,
          "data": data
        };
        SearchBuffer.push(searchResult);
      },
      get: function(keyWord){
        for(var i = 0; i < SearchBuffer.length; i++){
          if(keyWord == SearchBuffer[i].keyWord){
            return SearchBuffer[i];
          }
        }
        return null;
      },
      clear: function(keyWord){
        for(var i=0;i < SearchBuffer.length; i++){
          if(keyWord == SearchBuffer[i].keyWord){
            SearchBuffer.remove(i);
          }
        }
      },
      clearAll:function(){
        SearchBuffer = [];
      }
    }
  });

