angular.module('karaokeApp')
.controller('UserCtrl', function($scope, $http, $location, $rootScope) {

  $scope.message = "Login Required";
  $scope.songs = [];
  $scope.points = "";
  $scope.username = $rootScope.user;

  $scope.fetch = function() {
    $http.get('http://localhost:9292/songs').success(function (results) {
      console.log("This is the current user's id:");
      console.log($rootScope.id)
      for (var i = 0; i < results.length; i++) {
        if ( results[i].account_id === $rootScope.id ) {
          $scope.songs.push(results[i]);
        };
      };
    }).error(function(err) {
      console.log('Fetch failed; it didn\'t happen');
      console.log(err);
    });

    $http.get('http://localhost:9292/points/' + $rootScope.id).success(function (results) {
      console.log("User's score: " + results.score);
      $scope.points = results.score;
    }).error(function(err) {
      console.log('Fetch failed; it didn\'t happen');
      console.log(err);
    });
  };

  $scope.apiKeyCheck = function(){
    if ($rootScope.apiKey === "kota") {
      $scope.message = "";
      $scope.fetch();
    };
  };
  $scope.apiKeyCheck();

  $scope.changeRoute = function() {
    $location.path('/add');
  };

  $scope.changeRouteAccount = function() {
    $location.path('/user');
  };

  $scope.changeRouteSongs = function() {
    $location.path('/songs');
  };

  $scope.changeRouteScores = function() {
    $location.path('/scores');
  };

  $scope.removeSong = function(song) {
    console.log(song.id);
    var Sure = confirm('Do you want to delete that song?');
    if (Sure) {
      $http.delete('http://localhost:9292/songs/' + song.id).success(function(result) {
        $scope.songs = [];
        $scope.fetch(); // auto-update my list
      }).error(function(err) {
        console.log(err);
      });
    };
  };

});
