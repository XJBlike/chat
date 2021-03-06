var CHAT = {};

CHAT.COMMON = angular.module('CHAT.common', []);
CHAT.SERVICES = angular.module('CHAT.services', ['CHAT.common']);
CHAT.CONTROLLERS = angular.module('CHAT.controllers', ['CHAT.services','CHAT.common']);
CHAT.DIRECTIVES = angular.module('CHAT.directives',[]);
var socket = io.connect("192.168.0.100:9000");


angular.module('CHAT', ['ionic', 'CHAT.common','CHAT.controllers', 'CHAT.services','CHAT.directives'])
  .run(['$ionicPlatform',function($ionicPlatform) {
    $ionicPlatform.ready(function() {
     if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}])
  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    var tabsModuleStates = {
      chat: {
        chat: ['tab.chat','#/tab/chat'],
        detail: ['tab.chat-detail','#/tab/chat/detail'],
        info: ['tab.chat-info','#/tab/chat/info'],
        modifyBack: ['tab.chat-modifyBack','#/tab/chat/modifyBack'],
        record: ['tab.chat-record','#/tab/chat/record'],
        downloadRecord: ['tab.chat-downloadRecord','#/tab/chat/downloadRecord']
        },
      friends: {
        friends: ['tab.friends','#/tab/friends'],
        info: ['tab.friends-info','#/tab/friends/info'],
        chatDetail: ['tab.friends-chatDetail','#tab/friends/chatDetail'],
        search: ['tab.friends-search','#/tab/friends/search'],
        searchResult: ['tab.friends-searchResult','#/tab/friends/searchResult'],
        addFriend: ['tab.friends-add','#/tab/friends/add'],
        modifyBack: ['tab.friends-modifyBack','#/tab/friends/modifyBack'],
        userInfo: ['tab.friends-userInfo','#/tab/friends/userInfo'],
        record: ['tab.friends-record','#/tab/friends/record'],
        downloadRecord: ['tab.friends-downloadRecord','#/tab/friends/downloadRecord']
      },
      mine: {
        mine: ['tab.mine','#/tab/mine'],
        account: ['tab.mine-account','#/tab/mine/account'],
        changeName: ['tab.mine-changeName','#/tab/mine/changeName'],
        changeDesc: ['tab.mine-changeDesc','#/tab/mine/changeDesc'],
        changeLocation: ['tab.mine-changeLocation','#/tab/mine/changeLocation'],
        about: ['tab.mine-about','#/tab/mine/about'],
        login: ['tab.mine-login','#/tab/mine/login'],
        information: ['tab.mine-information','#/tab/mine/information'],
        modifyPassword: ['tab.mine-modifyPassword','#/tab/mine/modifyPassword']
      }
    };

  $stateProvider
    .state('tab', {
      url: "/tab",
      templateUrl: "templates/tabs.html",
      controller: 'AbstractTabsCtrl'
  })

    .state('tab.chat',{
      url: "/chat",
      views: {
        'tab-chat':
        {
          templateUrl: 'templates/chat/chat.html',
          controller: 'ChatCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.chat
      }
    })

    .state('tab.chat-detail',{
      url: "/chat/detail",
      params: {id: null},
      views: {
        'tab-chat': {
          templateUrl: 'templates/chat/chatDetail.html',
          controller: 'ChatDetailCtrl'
        }
      },
      data:　{
        forwardTo: tabsModuleStates.chat
      }
    })

    .state('tab.chat-info',{
      url: "/chat/info",
      params: {friendId: null,viewSource:null},
      views: {
        'tab-chat': {
          templateUrl: 'templates/friends/info.html',
          controller: 'InfoCtrl'
        }
      },
      data:　{
        forwardTo: tabsModuleStates.chat
      }
    })

    .state('tab.chat-modifyBack',{
      url: "/chat/modifyBack",
      params: {friend: null,userId:null},
      views: {
        'tab-chat': {
          templateUrl: 'templates/friends/modifyBack.html',
          controller: 'ModifyBackCtrl'
        }
      },
      data:　{
        forwardTo: tabsModuleStates.chat
      }
    })
    .state('tab.chat-record',{
      url: "/chat/record",
      params: {friendId:null,img:null},
      views: {
        'tab-chat': {
          templateUrl: 'templates/chat/record.html',
          controller: 'RecordCtrl'
        }
      },
      data:　{
        forwardTo: tabsModuleStates.chat
      }
    })
    .state('tab.chat-downloadRecord',{
      url: "/chat/downloadRecord",
      params: {friendId:null},
      views: {
        'tab-chat': {
          templateUrl: 'templates/chat/downloadRecord.html',
          controller: 'DownloadRecordCtrl'
        }
      },
      data:　{
        forwardTo: tabsModuleStates.chat
      }
    })



    .state('tab.friends',{
      url: "/friends",
      params:{viewSource:null},
      views:{
        'tab-friends':{
          templateUrl: 'templates/friends/friendList.html',
          controller: 'FriendsCtrl'
        }
      },
      data:{
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-info',{
      url: "/friends/info",
      params: {friendId: null,viewSource:null},
      views: {
        'tab-friends': {
          templateUrl: 'templates/friends/info.html',
          controller: 'InfoCtrl'
        }
      },
      data:{
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-userInfo',{
      url: "/friends/userInfo",
      params: {user: null},
      views: {
        'tab-friends': {
          templateUrl: 'templates/search/userInfo.html',
          controller: 'UserInfoCtrl'
        }
      },
      data:{
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-modifyBack',{
      url: "/friends/modifyBack",
      params: {friend: null,userId:null},
      views: {
        'tab-friends': {
          templateUrl: 'templates/friends/modifyBack.html',
          controller: 'ModifyBackCtrl'
        }
      },
      data:　{
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-chatDetail',{
      url: "/friends/chatDetail",
      params: {id: null},
      views: {
        'tab-friends': {
          templateUrl: 'templates/chat/chatDetail.html',
          controller: 'ChatDetailCtrl'
        }
      },
      data:　{
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-search',{
      url: "/friends/search",
      views: {
        'tab-friends': {
          templateUrl: 'templates/friends/search.html',
          controller: 'SearchCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-searchResult',{
      url: "/friends/searchResult",
      params: {keyword: null},
      views: {
        'tab-friends': {
          templateUrl: 'templates/friends/searchResult.html',
          controller: 'SearchResultCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-add',{
      url: "/friends/add",
      params: {friend: null},
      views: {
        'tab-friends': {
          templateUrl: 'templates/friends/addFriend.html',
          controller: 'AddFriendCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-record',{
      url: "/friends/record",
      params: {friendId:null,img:null},
      views: {
        'tab-friends': {
          templateUrl: 'templates/chat/record.html',
          controller: 'RecordCtrl'
        }
      },
      data:　{
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-downloadRecord',{
      url: "/friends/downloadRecord",
      params: {friendId:null},
      views: {
        'tab-friends': {
          templateUrl: 'templates/chat/downloadRecord.html',
          controller: 'DownloadRecordCtrl'
        }
      },
      data:　{
        forwardTo: tabsModuleStates.friends
      }
    })

    .state('tab.mine',{
      url: "/mine",
      views: {
        'tab-mine':{
          templateUrl: 'templates/mine/mine.html',
          controller: 'MineCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.mine
      }
    })
    .state('tab.mine-account',{
      url: "/mine/account",
      views:{
        'tab-mine':{
          templateUrl: 'templates/mine/account.html',
          controller: 'AccountCtrl'
        }
      },
      data:{
        forwardTo: tabsModuleStates.mine
      }
    })
    .state('tab.mine-changeName',{
      url: "/mine/changeName",
      params: {"nickname":null},
      views:{
        'tab-mine':{
          templateUrl: 'templates/mine/changeName.html',
          controller: 'ChangeNameCtrl'
        }
      },
      data:{
        forwardTo: tabsModuleStates.mine
      }
    })
    .state('tab.mine-changeDesc',{
      url: "/mine/changeDesc",
      params: {"description":null},
      views:{
        'tab-mine':{
          templateUrl: 'templates/mine/changeDesc.html',
          controller: 'ChangeDescCtrl'
        }
      },
      data:{
        forwardTo: tabsModuleStates.mine
      }
    })
    .state('tab.mine-changeLocation',{
      url: "/mine/changeLocation",
      params: {"location":null},
      views:{
        'tab-mine':{
          templateUrl: 'templates/mine/changeLocation.html',
          controller: 'ChangeLocationCtrl'
        }
      },
      data:{
        forwardTo: tabsModuleStates.mine
      }
    })
    .state('tab.mine-about',{
      url: "/mine/about",
      views:{
        'tab-mine':{
          templateUrl: 'templates/mine/about.html',
          controller: 'AboutCtrl'
        }
      },
      data:{
        forwardTo: tabsModuleStates.mine
      }
    })
    .state('tab.mine-login',{
      url: "/mine/login",
      views: {
        'tab-mine':{
          templateUrl: 'templates/login/login.html',
          controller: 'LoginCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.mine
      }
    })
    .state('tab.mine-information',{
      url: "/mine/information",
      params:{user:null},
      views: {
        'tab-mine':{
          templateUrl: 'templates/login/information.html',
          controller: 'InformationCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.mine
      }
    })

    .state('tab.mine-modifyPassword',{
      url: "/mine/modifyPassword",
      views: {
        'tab-mine':{
          templateUrl: 'templates/mine/modifyPassword.html',
          controller: 'ModifyPwdCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.mine
      }
    });



  // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/mine/login');

}]);
