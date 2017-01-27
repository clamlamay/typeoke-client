angular.module('karaokeApp')
.controller('ScoreCtrl', function($scope, $http, $location) {

  $scope.scores = [];

  $scope.populateList = function() {
    $http.get('http://localhost:9292/points').success(function (data) {
      $scope.scores = data;
      var highToLow = $scope.scores;
      highToLow.sort(function(a, b){
        return b.score-a.score
      })
      // Capitalizes usernames
      for (var i = 0; i < highToLow.length; i++) {
        highToLow[i].username = highToLow[i].username.charAt(0).toUpperCase() + highToLow[i].username.substr(1);;
      }
    }).error(function(err) {
      console.log('Fetch failed; it didn\'t happen');
      console.log(err);
    });
  }
  $scope.populateList();

  $scope.changeRoute = function() {
    $location.path('/add');
  };

  $scope.changeRouteAccount = function() {
    $location.path('/user');
  };

  $scope.changeRouteSongs = function() {
    $location.path('/songs');
  };
});
