app.controller("editUserController", ["$scope", "$routeParams", "$location", "userMngService", function($scope, $routeParams, $location, userMngService) {
  var userId = Number($routeParams.id);
  $scope.id = userId;
  $scope.user = {id:"", fName:"",  lName:"", title:"", gender:"", age:""};

  userMngService.getUserById("/users", userId)
  .then(function(data) {
      $scope.user = data;
  });

  /*
  console.log("host: "+ $location.host());
  console.log("port: " + $location.port());
  console.log("url: " + $location.absUrl());
  */

  $scope.passw1 = "";
  $scope.passw2 = "";
  $scope.error = false;
  $scope.incomplete = true;

  $scope.$watch('passw1',function() {$scope.test();});
  $scope.$watch('passw2',function() {$scope.test();});
  $scope.$watch('user.fName', function() {$scope.test();});
  $scope.$watch('user.lName', function() {$scope.test();});

  $scope.test = function() {
    if ($scope.passw1 && $scope.passw2 && $scope.passw1 !== $scope.passw2) {
      $scope.error = true;
    } else {
      $scope.error = false;
    }
    $scope.incomplete = true;
    if ($scope.user.fName && $scope.user.lName &&
        $scope.passw1 && $scope.passw2) {
        $scope.incomplete = false;
    }
  };

  $scope.editUser = function($event) {
    $event.preventDefault();
    userMngService.updateUser("/users", userId, $scope.user);
    $location.path("/");
  }

  $scope.cancel = function($event) {
    $event.preventDefault();
    $location.path("/");
  }
}]);