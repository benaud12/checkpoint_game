checkpointApp.controller('GameCtrl', function(DatabaseDataFactory, UserDataFactory, CurrentLocationFactory, CurrentGameDataFactory, $rootScope, $scope, $state, $firebaseObject, $ionicPopup){

  var ref = DatabaseDataFactory;
  var syncObject = $firebaseObject(ref);
  var currentGameRef, currentGameName;
  var authData = ref.getAuth();
  // $scope.data = {};
  // syncObject.$bindTo($scope, 'data')

  console.log("hello?")
  if (authData) {

    CurrentGameDataFactory(authData.uid, function(returnVal) {
      if (returnVal) {
        console.log('return', returnVal.val());

        currentGameRef = returnVal.ref();
        // currentGameName = returnVal.key();
        // $scope.data.nextCheckpoint = findNext(returnVal.val().checkpoints)
        // $scope.data.gameComplete = isAllLocated(returnVal.val().checkpoints)
        // $scope.data.currentGame = returnVal.val();
        // $scope.data.currentGameName = currentGameName
        var gameSyncObject = $firebaseObject(currentGameRef);
        gameSyncObject.$bindTo($scope, 'currentGame');

        // if (!$scope.data.gameComplete) {
        //   CurrentLocationFactory(function(returnVal) {
        //     var currentLocation = returnVal;
        //     // $scope.$apply(function(){
        //       $scope.distanceUpdate(currentLocation)
        //     // });
        //   });
        // }
      }

    });

    // var userLink = 'users/' + $scope.authData.uid

    // $scope.startGame = function(gameName) {
    //   var currentGameLink = userLink + '/games/' + currentGameName;
    //   var gameLink = 'games/' + gameName;
    //   var startTime = new Date();

    //   if (currentGameName) {
    //     ref.child(currentGameLink).update({
    //       currentGame: false
    //     });
    //   }

    //   ref.child(gameLink).once('value', function(snapshot) {
    //     var game = snapshot.val();
    //     ref.child(userLink).child(gameLink).update(game);
    //     ref.child(userLink).child(gameLink).update({
    //       started: startTime,
    //       finished: null,
    //       currentGame: true
    //     });
    //     document.location.reload();
    //   })
    // };

    // $scope.startGamePopup = function() {
    //   $ionicPopup.show({
    //     templateUrl: 'views/tab-game-select.html',
    //     title: 'Please select a game',
    //     scope: $scope,
    //     buttons: [
    //       { text: 'Cancel' }
    //     ]
    //   });
    // }

//

    // var watchID;
    // var geoLoc;

    // function checkDistance(position) {
    //   var latitude = position.coords.latitude;
    //   var longitude = position.coords.longitude;
    //   userLocation = [latitude, longitude];
    //   if ($scope.nextCheckpoint) {
    //     $scope.checkInResultUpdate(userLocation)
    //   };
    //   $scope.$apply();
    // }

    // function errorHandler(err) {
    //   if(err.code == 1) {
    //      alert("Error: Access is denied!");
    //   }

    //   else if( err.code == 2) {
    //      alert("Error: Position is unavailable!");
    //   }
    // }

    // function getLocationUpdate(){
    //   if(navigator.geolocation){
    //     geoLoc = navigator.geolocation;
    //     watchID = geoLoc.watchPosition(checkDistance, errorHandler);
    //   }

    //   else{
    //      alert("Sorry, browser does not support geolocation!");
    //   }
    // }

    // getLocationUpdate();

//

    // $scope.checkIn = function() {
    //   $scope.runningCheckIn = true;
    //   CurrentLocationFactory(function(returnVal){
    //     var userLocation = returnVal;
    //     $scope.checkInResultUpdate(userLocation)
    //     $scope.runningCheckIn = false;
    //     $scope.$apply();
    //   });
    // };


    // $scope.distanceUpdate = function(userLocation) {
    //   var checkpointId = $scope.data.nextCheckpoint.id;
    //   var link = 'users/' + authData.uid + '/games/' + currentGameName;
    //   var checkpointData = ref.child(link).child('checkpoints').child(checkpointId);
    //   var userData = ref.child('users').child(authData.uid);
    //   var targetLocation = [$scope.data.nextCheckpoint.position.latitude, $scope.data.nextCheckpoint.position.longitude];
    //   var distanceToTarget = GeoFire.distance(userLocation, targetLocation);
    //   // $scope.humanDistanceToTarget =  ($scope.distanceToTarget * 1000).toFixed(0);
    //   checkpointData.update( dataChanges(distanceToTarget) );
    //   console.log('location', userLocation)

    //   ref.child(link).once('value', function(snapshot) {
    //     var checkpoints = snapshot.val().checkpoints;
    //     if (isAllLocated(checkpoints)) {
    //       finishTime = new Date();
    //       ref.child(link).update({finished: finishTime});
    //       $scope.data.gameComplete = true;
    //     } else {
    //       userData.once('value', function(snapshot) {
    //         if ( snapshot.val().distance < distanceToTarget ) {
    //           $scope.data.hysteresis = { hotOrCold: 'Getting colder...' };
    //         } else {
    //           $scope.data.hysteresis = { hotOrCold: 'Getting warmer...' };
    //         };
    //         // var humanDistanceToTarget = (distanceToTarget * 1000).toFixed();


    //         userData.update( {distance: distanceToTarget} );
    //         console.log('distnce', distanceToTarget)
    //         console.log('finished')
    //       });

    //     };

    //   });

    // };







    // $scope.checkInResultUpdate = function(userLocation) {
    //   var checkpointId = $scope.nextCheckpoint.id;
    //   var link = userLink + '/games/' + $scope.currentGame;
    //   var checkpointData = ref.child(link).child('checkpoints').child(checkpointId);
    //   var userData = ref.child(userLink);
    //   var targetLocation = [$scope.nextCheckpoint.position.latitude, $scope.nextCheckpoint.position.longitude];
    //   $scope.distanceToTarget = GeoFire.distance(userLocation, targetLocation);
    //   $scope.humanDistanceToTarget =  ($scope.distanceToTarget * 1000).toFixed(0);

    //   userData.once('value', function(snapshot) {
    //     if ( snapshot.val().distance < $scope.distanceToTarget ) {
    //       $scope.hotterColder = 'Getting colder...';
    //     } else {
    //       $scope.hotterColder = 'Getting warmer...';
    //     };

    //     userData.update( {distance: $scope.distanceToTarget} );

    //   });

    //   checkpointData.update( dataChanges($scope.distanceToTarget) );
    // };

    $scope.quitGame = function() {
      if (currentGameRef) {
        currentGameRef.update({
          currentGame: false
        });
        document.location.reload();
      };
    };

    // var dataChanges = function(distanceToTarget) {
    //   if (distanceToTarget > 3) {
    //     return ({color: '#447BF2'})
    //   }
    //   else if ( distanceToTarget > 1.5 ) {
    //     return ({color: '#8FB091'})
    //   }
    //   else if ( distanceToTarget > 0.5 ) {
    //     return ({color: '#ECF218'})
    //   }
    //   else if ( distanceToTarget > 0.2 ) {
    //     return ({color: '#FCB50F'})
    //   }
    //   else if ( distanceToTarget > 0.1 ) {
    //     return ({color: '#FA8F17'})
    //   }
    //   else if ( distanceToTarget > 0.05 ) {
    //     return ({color: '#F50733'})
    //   }
    //   else if ( distanceToTarget <= 0.05) {
    //     locatedPopup();
    //     return ({color: '#26ED33', located: true})
    //   }
    // };

    // var locatedPopup = function() {
    //   $ionicPopup.show({
    //     template: $scope.data.nextCheckpoint.realName,
    //     title: 'Congratulations!',
    //     subTitle: 'You have successfully located...',
    //     buttons: [{ text: 'Close' }]
    //   });
    // };

    // $scope.checkpointPopup = function(checkpoint) {
    //   var checkpointRealName;
    //   var checkpointName = checkpoint.name;
    //   if (checkpoint.located) {
    //     checkpointRealName = checkpoint.realName;
    //   } else {
    //     checkpointRealName = "You haven't found me yet!"
    //   }
    //   $ionicPopup.show({
    //     title: checkpointName,
    //     subTitle: checkpointRealName,
    //     buttons: [{ text: 'Close' }]
    //   });
    // }




    // ref.on('value', function(dataSnapshot){

      // if ($scope.currentGame) {
      //   var link = userLink + '/games/' + $scope.currentGame;
      //   ref.child(link).child('checkpoints').once('value', function(snapshot) {
      //     $scope.userCheckpoints = snapshot.val();
      //     if (isAllLocated(snapshot.val()) && !$scope.gameComplete) {
      //       finishTime = new Date();
      //       ref.child(link).update({finished: finishTime})
      //       $scope.gameComplete = isAllLocated(snapshot.val())
      //     }
      //   });
      // };

      // ref.child('games').once('value', function(snapshot) {
      //   $scope.allGames = snapshot.val();
      // })

      // ref.child(userLink).child('games').once('value', function(snapshot) {
      //   // $scope.currentGame = null;
      //   $scope.nextCheckpoint = null;
      //   snapshot.forEach(function(game) {
      //     var currentGame = game.val().currentGame
      //     if (currentGame) {
      //       $scope.currentGame = game.key()
      //       $scope.userCheckpoints = game.val().checkpoints
      //       $scope.nextCheckpoint = findNext(game.val().checkpoints)
      //     };
      //   });
      // });



      // var link = userLink + '/games/' + $scope.currentGame;
      //     ref.child(link).once('value', function(snapshot) {
      //     var game = snapshot.val();
      //     var startTime = Date.parse(game.started);
      //     var timeNow = Date.now();
      //     var timeLapsed = (timeNow - startTime);
      //     var mydate = new Date(timeLapsed);
      //     var humandate = mydate.getUTCHours()+ " hours, " + mydate.getUTCMinutes()+ " minutes and " + mydate.getUTCSeconds()+ " second(s)";
      //     var timeVar = document.getElementById('timer'), seconds = mydate.getUTCSeconds(), minutes = mydate.getUTCMinutes(), hours = mydate.getUTCHours(), time;

      //     function add() {
      //       seconds++;
      //       if (seconds >= 60) {
      //         seconds = 0;
      //         minutes++;
      //           if (minutes >= 60) {
      //             minutes = 0;
      //             hours++;
      //           }
      //     }
      //       timeVar.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
      //       ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
      //       ":" + (seconds > 9 ? seconds : "0" + seconds);
      //       timer();
      //     }
      //     function timer() {
      //       var time = setTimeout(add, (1000 - (Date.now() % 1000)));;
      //     }
      //     timer();

      //   });

    // });

  }

});
