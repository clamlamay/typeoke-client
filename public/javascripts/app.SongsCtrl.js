angular.module('karaokeApp')
.controller('SongsCtrl', function($scope, $http, $location, $routeParams, $rootScope) {

  $scope.songs = [];
  $scope.message = "API Key Required";
  $scope.playlist = true;

  $scope.apiKeyCheck = function(){
    if ($rootScope.apiKey === "kota") {
      $scope.playlist = false;
      $scope.message = "";
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

  $scope.fetch = function() {
    $http.get('http://localhost:9292/songs').success(function (results) {
      $scope.songs = results;
    }).error(function(err) {
      console.log('Fetch failed; it didn\'t happen');
      console.log(err);
      });
  };

  $scope.fetch();

  $scope.showLyric = function(id) {
    $location.path('/' + id );
  };
});

