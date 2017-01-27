angular.module('karaokeApp')
  .controller('LoginCtrl', function($scope, $http, $location, $rootScope) {

  $rootScope.apiKey = null;
  $rootScope.login = true;
  $rootScope.logout = false;

  $scope.retrievePoints = function(){
    $http.get('http://localhost:9292/points/' + $rootScope.id)
        .success(function (results) {
        console.log("User's score: " + results.score);
        $rootScope.points = results.score;
      }).error(function(err) {
        console.log('Fetch failed; it didn\'t happen');
        console.log(err);
      });
  };

  $scope.loginUser = function(username, password) {
    $http({
      url: 'http://localhost:9292/users/login',
      method: 'POST',
      params: { username: username, password: password }
    }).success(function(results) {
      $rootScope.apiKey = results[0].api_key;
      if ( $scope.username === results[0].username && $scope.password === results[0].password ) {
        $rootScope.id = results[0].id;
        $rootScope.user = results[0].username;
        $scope.retrievePoints();
        $location.path('/add');
      } else if ( $scope.password !== results[0].password ) {
        $scope.messages = 'Incorrect password, try again.' ;
      }
      console.log('Post success.');
    }).error(function(err) {
    	$scope.messages = 'Please try again.';
    	console.log('Ajax request failed.');
    	console.log(err);
    });
  };

  $scope.changeRoute = function() {
    $location.path('/');
  };
});



