/**
 * Created by XJB11 on 2016/5/2 0002.
 */
CHAT.SERVICES
   .factory('Message',['Storage','dateService','socket',
     function(Storage,dateService,socket){
          return{
            init: function() {
              Storage.set("records",[]);
            },
            getAll: function(){
              var records = Storage.get("records");
              return records;
            },
            removeMessage : function(record){
              var records = Storage.get("records");
              var userId = Storage.get("userInfo").id;
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
              for(var i=0;i<records.length;i++) {
                if (records[i].id == id) {
                  return records[i];
                }
              }
              return null;
            },
            updateMessage: function(message){
              var records = Storage.get("records");
              if(records.length){
                for(var i=0;i<records.length;i++){
                  if(records[i].id == message.id){
                    records[i]=message;
                    break;
                  }
                }
                if(i==records.length && records[i-1].id != message.id){
                  records.push(message);
                }
              }else{
                records.push(message);
              }
              Storage.set("records",records);
            }
          }
   }])
  .factory('dateService', [function() {
    return {
      handleMessageDate: function(message) {
         var messageDate = {},
          nowDate = {},
          weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
          diffWeekValue = 0;
        if (message) {
          nowDate = this.getNowDate();
            messageDate = this.getMessageDate(message);
            if(!messageDate){
              return null;
            }
            if (nowDate.year - messageDate.year > 0) {
              message.realTime = messageDate.year + "";
            }
            if (nowDate.month - messageDate.month >= 0 ||
              nowDate.day - messageDate.day > nowDate.week) {
              message.realTime = messageDate.month +
                "月" + messageDate.day + "日";
            }
            if (nowDate.day - messageDate.day <= nowDate.week &&
              nowDate.day - messageDate.day > 1) {
              diffWeekValue = nowDate.week - (nowDate.day - messageDate.day);
              message.realTime = weekArray[diffWeekValue];
            }
            if (nowDate.day - messageDate.day === 1) {
              message.realTime = "昨天 "+messageDate.hour+":"+messageDate.minute;
            }
            if (nowDate.day - messageDate.day === 0) {
              message.realTime = messageDate.hour + ":" + messageDate.minute;
            }
        } else {
          console.log("message is null");
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
      },
      getScreenDate:function (timeStamp) {
        var   year=timeStamp.getFullYear();
        var   month=timeStamp.getMonth()+1;
        var   date=timeStamp.getDate();
        var   hour=timeStamp.getHours();
        var   minute=timeStamp.getMinutes();
        var   second=timeStamp.getSeconds();
        return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
      }
    };

  }]);
