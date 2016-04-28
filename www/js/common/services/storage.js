'use strict';

CHAT.COMMON
    .factory('Storage', function () {
        return {
            set: function (key, data) {
                try {
                    return window.localStorage.setItem(key, window.JSON.stringify(data));
                }catch (e){
                    alert("您处于无痕浏览，无法为您保存");
                    return null;
                }
            },
            get: function (key) {
                return window.JSON.parse(window.localStorage.getItem(key));
            },
            remove: function (key) {
                 return window.localStorage.removeItem(key);
            }
        };
    });
