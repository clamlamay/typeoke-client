angular.module('karaokeApp')
.controller('AddSongCtrl', function($scope, $http, $location, $rootScope) {

  $rootScope.login = false;
  $rootScope.logout = true;

  $scope.messages = [
    'Add your song! Please fill out all fields.',
    'Thanks for your lyrics!'
  ];

  $scope.songs = [];

  $scope.fetch = function() {
    $http.get('http://localhost:9292/songs').success(function (results) {
      $scope.songs = results;
    }).error(function(err) {
      console.log('Fetch failed; it didn\'t happen');
      console.log(err);
    });
  };

  $scope.fetch();

  $scope.addSong = function(title, artist, lyrics, account_id) {
    $http({
      url: 'http://localhost:9292/songs/',
      method: 'POST',
      params: { title: title, artist: artist, lyrics: lyrics, account_id: $rootScope.id, api_key: $rootScope.apiKey}
    }).success(function(results) {
      console.log($rootScope.id);
      $scope.message = $scope.messages[1];
    }).error(function(err) {
      console.log('Ajax request failed.');
      console.log(err);
    });
  };

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

});