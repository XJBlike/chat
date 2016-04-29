CHAT.SERVICES
.factory('Chats', ['Storage',function(Storage) {
  return {
    all: function() {
      return Storage.get("chats");
    },
    remove: function(chat) {
      var chats = Storage.get("chats");
      for(var i = 0;i < chats.length;i++){
          if(chat.id === chats[i].id){
            chats.splice(i,1);
            Storage.set("chats",chats);
            return chats;
          }
      }
      return chats;
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id == chatId) {
          return chats[i];
        }
      }
      return null;
    }
  };
}]);
