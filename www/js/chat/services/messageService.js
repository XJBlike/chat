/**
 * Created by XJB11 on 2016/5/2 0002.
 */
CHAT.SERVICES
   .factory('Message',['$http','Storage',
     function($http,Storage){
       $http.get("../../../data/json/messages.json").success(function(data){
         var messages = data.messages;
         Storage.set("messages",messages);
       });
          return{
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
            }
          }
   }]);
