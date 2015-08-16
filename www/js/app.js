// Ionic Starter App
//
var FB_REF = new Firebase("https://coy-test.firebaseio.com/");

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'firebase', 'ngStorage', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $firebaseAuth) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }


  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state("firebase", {
        url: "/firebase",
        templateUrl: "templates/firebase.html",
        controller: "FirebaseController",
        cache: false
    })
    .state("secure", {
        url: "/secure",
        templateUrl: "templates/secure.html",
        controller: "SecureController"
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/firebase');

});
