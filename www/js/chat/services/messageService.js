/**
 * Created by XJB11 on 2016/5/2 0002.
 */
CHAT.SERVICES
   .factory('Message',['Storage','dateService','socket',
     function(Storage,dateService,socket){
       var messageStruct = {
         "id":null,
         "backname":null,
         "nickname":null,
         "img":null,
         "lastMessage":{},
         "noReadMessages":0,
         "showHints":true,
         "isTop":0,
         "showMessage":true,
         "message":[]
       };
       var userInfo = Storage.get("userInfo");
          return{
            init: function() {
              var userId = Storage.get("userInfo").id;
              var records = [];
              socket.emit("messages:getAll",{userId:userId});
              socket.on("messages:getAllSuccess",function(data){
                for(var i=0;i<data.messages.length;i++){
                  records[i] = JSON.parse(data.messages[i].record);
                }
                dateService.handleMessageDate(records);
                Storage.set("records",records);
              });
            },
            getAll: function(){
              var records = Storage.get("records");
              return records;
            },
            removeMessage : function(record){
              var records = Storage.get("records");
              for(var i = 0;i < records.length;i++){
                if(records[i].id == record.id){
                  record.showMessage = false;
                  records.splice(i,1);
                  Storage.set("records");
                }
              }
            },
            getMessageById : function(id){
              var records = Storage.get("records");
              var record = messageStruct;
              for(var i=0;i<records.length;i++) {
                if (records[i].id == id) {
                  return records[i];
                }
              }
            },
            updateMessage: function(message){
              var records = Storage.get("records");
              var userId = Storage.get("userInfo").id;
              for(var i=0;i<records.length;i++){
                if(records[i].id == message.id){
                  records[i]=message;
                  Storage.set("records",records);
                  socket.emit("updateRecord",{record:message,userId:userId,friendId:message.id});
                }
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
          return messageDate;
        } else {
          console.log("message is null");
          return null;
        }
      }
    };
  }]);
