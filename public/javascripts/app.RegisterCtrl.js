angular.module('karaokeApp')
  .controller('RegisterCtrl', function($scope, $http, $location, $rootScope) {

  $scope.messages = 'Register';
  $rootScope.login = true;
  $rootScope.logout = false;

  $scope.addPointsAccount = function() {
    $http({
        url: 'http://localhost:9292/points/',
        method: 'POST',
        params: { score: 0, username: $rootScope.user }
      }).success(function(results) {
        $rootScope.points = results.score;
        console.log(results.username);
        console.log(results.score);
      }).error(function(err) {
        console.log('Ajax request failed.');
        console.log(err);
      });
  };

  $scope.addUser = function(username, password) {
    $http({
      url: 'http://localhost:9292/users/register',
      method: 'POST',
      params: { username: username, password: password}
    }).success(function(results) {
      $rootScope.apiKey = results.api_key;
      $rootScope.id = results.id;
      $rootScope.user = results.username;
      console.log("Current user: " + $rootScope.user);
      $scope.addPointsAccount();
      $location.path('/add');
    }).error(function(err) {
      console.log('Ajax request failed.');
      console.log(err);
    });
  };

  $scope.changeRoute = function() {
    $location.path('/register');
  };

});