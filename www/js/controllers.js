angular.module('starter.controllers', [])

.controller('FirebaseController', ['$scope', '$state', '$firebaseAuth', '$ionicLoading',
    function($scope, $state, $firebaseAuth, $ionicLoading) {

    var fbAuth = $firebaseAuth(FB_REF);

    $scope.login = function(username, password) {
        $ionicLoading.show();

        fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            console.log(authData);
            $ionicLoading.hide();
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
            $ionicLoading.hide();
        });
    }

    $scope.register = function(username, password) {
        fbAuth.$createUser({email: username, password: password}).then(function(userData) {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }

}])

.controller("SecureController", function($scope, $ionicHistory, $ionicLoading, $firebaseArray, $cordovaCamera, $cordovaToast, $ionicActionSheet, $timeout) {

    $ionicHistory.clearHistory();
    $ionicLoading.show();

    $scope.images = [];
    var userReference;

    var fbAuth = FB_REF.getAuth();
    if(fbAuth) {
        userReference = FB_REF.child("users/" + fbAuth.uid);
        $scope.images = $firebaseArray(userReference.child("images"));
        $scope.images.$loaded()
            .then(function(){
                $ionicLoading.hide();
            });
    } else {
        $state.go("firebase");
    }

    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData, status: 'uploading'}).then(function(ref) {
                ref.child('status').set('uploaded');
                $cordovaToast.showShortBottom("Upload realizado com sucesso");
            });
        }, function(error) {
            console.error(error);
        });
    };

    // Triggered on a button click, or some other target
     $scope.showActions = function(pic) {

       // Show the action sheet
       var hideSheet = $ionicActionSheet.show({
         buttons: [
           { text: '<i class="icon ion-android-share"></i><b>Compartilhar</b>' },
         ],
         destructiveText: '<i class="icon ion-trash-b"></i> Excluir',
         titleText: 'Ações Disponíveis',
         cancelText: 'Cancel',
         cancel: function() {
              // add cancel code..
            },
         buttonClicked: function(index) {
            alert('Em breve!');
           return true;
         },
         destructiveButtonClicked: function(){
            $scope.images.$remove(pic).then(function(){
                $cordovaToast.showShortBottom("Imagem excluída com sucesso!");
            });

            return true;
         }
       });

       // For example's sake, hide the sheet after two seconds
       $timeout(function() {
         hideSheet();
       }, 2000);

     };

});
