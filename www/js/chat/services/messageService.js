/**
 * Created by XJB11 on 2016/5/2 0002.
 */
CHAT.SERVICES
   .factory('Message',['$http','Storage','dateService',
     function($http,Storage,dateService){
       $http.get("../../../data/json/messages.json").success(function(data){
         var messages = data.messages;
         Storage.set("messages",messages);
       });
          return{
            init: function(messages) {
              var i = 0;
              var length = 0;
              var messageID = new Array();
              var date = null;
              var messageDate = null;
              if (messages) {
                length = messages.length;
                for (; i < length; i++) {
                  messageDate = dateService.getMessageDate(messages[i]);
                  if(!messageDate){
                    return null;
                  }
                  date = new Date(messageDate.year, messageDate.month,
                    messageDate.day, messageDate.hour, messageDate.minute,
                    messageDate.second);
                  messages[i].lastMessage.timeFrome1970 = date.getTime();
                  messageID[i] = {
                    id: messages[i].id
                  };

                }
               Storage.set("messageID", messageID);
                for (i = 0; i < length; i++) {
                  Storage.set("message_" + messages[i].id, messages[i]);
                }
              }
            },
            getAllMessages: function() {
              var messages = new Array();
              var i = 0;
              var messageID = Storage.get("messageID");
              var length = 0;
              var message = null;
              if (messageID) {
                length = messageID.length;

                for (; i < length; i++) {
                  message = Storage.get("message_" + messageID[i].id);
                  if(message){
                    messages.push(message);
                  }
                }
                dateService.handleMessageDate(messages);
                return messages;
              }
              return null;

            },
            getAll : function(){
              return Storage.get("messages");
            },
            removeMessage : function(message){
              var messages = Storage.get("messages");
              for(var i = 0;i < messages.length;i++){
                if(messages[i].userId == message.userId){
                  message.showMessage = false;
                  messages.splice(i,1);
                  Storage.set("messages");
                }
              }
            },
            deleteMessageId: function(id){
              var messageId = Storage.get("messageID");
              var length = 0;
              var i = 0;
              if(!messageId){
                return null;
              }
              length = messageId.length;
              for(; i < length; i++){
                if(messageId[i].id === id){
                  messageId.splice(i, 1);
                  break;
                }
              }
              Storage.set("messageID", messageId);
            },
            getMessageById : function(id){
              var messages = Storage.get("messages");
              for(var i = 0;i < messages.length;i++){
                if(messages[i].userId == id){
                  return messages[i];
                }
              }
              return null;
            },
            getAmountMessageById: function(num, id){
              var messages = [];
              var message = this.getMessageById(id).message;
              var length = 0;
              if(num < 0 || !message) return;
              length = message.length;
              if(num < length){
                messages = message.splice(length - num, length);
                return messages;
              }else{
                return message;
              }
            },
            updateMessage: function(message) {
              var id = 0;
              if (message) {
                id = message.id;
                Storage.set("message_"+id,angular.toJson(message));
              }
            }
          }
   }])
  .factory('dateService', [function() {
    return {
      handleMessageDate: function(messages) {
        var i = 0,
          length = 0,
          messageDate = {},
          nowDate = {},
          weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
          diffWeekValue = 0;
        if (messages) {
          nowDate = this.getNowDate();
          length = messages.length;
          for (i = 0; i < length; i++) {
            messageDate = this.getMessageDate(messages[i]);
            if(!messageDate){
              return null;
            }
            if (nowDate.year - messageDate.year > 0) {
              messages[i].lastMessage.time = messageDate.year + "";
              continue;
            }
            if (nowDate.month - messageDate.month >= 0 ||
              nowDate.day - messageDate.day > nowDate.week) {
              messages[i].lastMessage.time = messageDate.month +
                "月" + messageDate.day + "日";
              continue;
            }
            if (nowDate.day - messageDate.day <= nowDate.week &&
              nowDate.day - messageDate.day > 1) {
              diffWeekValue = nowDate.week - (nowDate.day - messageDate.day);
              messages[i].lastMessage.time = weekArray[diffWeekValue];
              continue;
            }
            if (nowDate.day - messageDate.day === 1) {
              messages[i].lastMessage.time = "昨天";
              continue;
            }
            if (nowDate.day - messageDate.day === 0) {
              messages[i].lastMessage.time = messageDate.hour + ":" + messageDate.minute;
              continue;
            }
          }
          // console.log(messages);
          // return messages;
        } else {
          console.log("messages is null");
          return null;
        }

      },
      getNowDate: function() {
        var nowDate = {};
        var date = new Date();
        nowDate.year = date.getFullYear();
        nowDate.month = date.getMonth();
        nowDate.day = date.getDate();
        nowDate.week = date.getDay();
        nowDate.hour = date.getHours();
        nowDate.minute = date.getMinutes();
        nowDate.second = date.getSeconds();
        return nowDate;
      },
      getMessageDate: function(message) {
        var messageDate = {};
        var messageTime = "";
        //2015-10-12 15:34:55
        var reg = /(^\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/g;
        var result = new Array();
        if (message) {
          messageTime = message.lastMessage.originalTime;
          result = reg.exec(messageTime);
          if (!result) {
            console.log("result is null");
            return null;
          }
          messageDate.year = parseInt(result[1]);
          messageDate.month = parseInt(result[2]);
          messageDate.day = parseInt(result[3]);
          messageDate.hour = parseInt(result[4]);
          messageDate.minute = parseInt(result[5]);
          messageDate.second = parseInt(result[6]);
          // console.log(messageDate);
          return messageDate;
        } else {
          console.log("message is null");
          return null;
        }
      }
    };
  }]);
