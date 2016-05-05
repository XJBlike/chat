var CHAT = {};

CHAT.COMMON = angular.module('CHAT.common', []);
CHAT.SERVICES = angular.module('CHAT.services', ['CHAT.common']);
CHAT.CONTROLLERS = angular.module('CHAT.controllers', ['CHAT.services','CHAT.common']);
CHAT.DIRECTIVES = angular.module('CHAT.directives',[]);

angular.module('CHAT', ['ionic', 'CHAT.common','CHAT.controllers', 'CHAT.services','CHAT.directives'])
  .run(['$ionicPlatform','SqliteOperationService',function($ionicPlatform,SqliteOperationService) {
    $ionicPlatform.ready(function() {

      SqliteOperationService.initDB();

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
        login: ['tab.chat-login', '#/tab/chat/login'],
        register: ['tab.chat-register','#/tab/chat/register']
        },
      friends: {
        friends: ['tab.friends','#/tab/friends'],
        info: ['tab.friends-info','#/tab/friends/info'],
        chatDetail: ['tab.friends-chatDetail','#tab/friends/chatDetail'],
        search: ['tab.friends-search','#/tab/friends/search'],
        searchResult: ['tab.friends-searchResult','#/tab/friends/searchResult'],
        addFriend: ['tab.friends-add','#/tab/friends/add'],
        login: ['tab.friends-login', '#/tab/friends/login'],
        register: ['tab.friends-register','#/tab/friends/register']
      },
      mine: {
        mine: ['tab.mine','#/tab/mine'],
        account: ['tab.mine-account','#/tab/mine/account'],
        changeName: ['tab.mine-changeName','#/tab/mine/changeName'],
        changeDesc: ['tab.mine-changeDesc','#/tab/mine/changeDesc'],
        changeLocation: ['tab.mine-changeLocation','#/tab/mine/changeLocation'],
        about: ['tab.mine-about','#/tab/mine/about'],
        login: ['tab.mine-login', '#/tab/mine/login'],
        register: ['tab.mine-register','#/tab/mine/register']
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
      params: {messageId: null},
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

    .state('tab.chat-login',{
      url: "/chat/login",
      views: {
        'tab.chat': {
          templateUrl: 'templates/login/login.html',
          controller: 'LoginCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.chat
      }
    })

    .state('tab.chat-register',{
      url: "/chat/register",
      views: {
      'tab-chat': {
        templateUrl: 'templates/register/register.html',
        controller: 'RegisterCtrl'
      }
    },
      data:{
        forwardTo: tabsModuleStates.chat
      }
    })

    .state('tab.friends',{
      url: "/friends",
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
      url: "friends/info",
      params: {friendId: null},
      views: {
        'tab-friends': {
          templateUrl: 'templates/friends/info.html',
          controller: 'FriendInfoCtrl'
        }
      },
      data:{
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-chatDetail',{
      url: "/friends/chatDetail",
      params: {messageId: null,backUp:null,userName: null,img: null},
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
      params: {userId: null},
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
    .state('tab.friends-login',{
      url: "/friends/login",
      views: {
        'tab.friends': {
          templateUrl: 'templates/login/login.html',
          controller: 'LoginCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.friends
      }
    })
    .state('tab.friends-register',{
      url: "/friends/register",
      views: {
        'tab.friends': {
          templateUrl: 'templates/register/register.html',
          controller: 'RegisterCtrl'
        }
      },
      data: {
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
      params: {"userName":null},
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
    .state('tab.mine-register',{
      url: "/mine/register",
      views: {
        'tab.mine': {
          templateUrl: 'templates/login/register.html',
          controller: 'RegisterCtrl'
        }
      },
      data: {
        forwardTo: tabsModuleStates.mine
      }
    });



  // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/mine');

}]);
