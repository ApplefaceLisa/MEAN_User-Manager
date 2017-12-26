app.controller("listUserController", ["$scope", "$location", "userMngService", "pagerService", function($scope, $location, userMngService, pagerService) {
    //$scope.users = userMngService.userlist;

    $scope.showInfo = false;
    $scope.pageSize = userMngService.getPagesize();
    $scope.currentpage = userMngService.getPage();
    $scope.users = [];
    $scope.pager = {};

    getUsers();

    function getUsers() {
        userMngService.getUsers("/users")
        .then(function(response) {
            $scope.users = response.data;
            $scope.pager = pagerService.getPager($scope.users.length, $scope.currentpage, $scope.pageSize);
            $scope.currentpage = $scope.pager.currentPage;
            $scope.showInfo = true;
        }, function() {
            console.log("get users error");
        });
    }

    function setPagesize(size) {
        userMngService.setPagesize($scope.pageSize);
        $scope.pager = pagerService.getPager($scope.users.length, $scope.currentpage, $scope.pageSize);
    }

    $scope.$watch('pageSize', function() {
        if ($scope.pageSize !== userMngService.getPagesize())
            setPagesize($scope.pageSize);
    });

    $scope.$watch('currentpage', function() {
        if ($scope.currentpage !== userMngService.getPage())
            userMngService.setPage($scope.currentpage);
    });

    $scope.setPage = function(page) {
        if (page < 1 || page > $scope.pager.totalPages) {
          return;
        }
        $scope.currentpage = page;
        $scope.pager = pagerService.getPager($scope.users.length, $scope.currentpage, $scope.pageSize);
    };

    $scope.searchKey = "";
    $scope.propertyName = "";
    $scope.reverse = false;
    $scope.sortBy = function(name) {
        $scope.reverse = ($scope.propertyName === name) ? !$scope.reverse : false;
        $scope.propertyName = name;
    }

    $scope.createUser = function($event) {
        $event.preventDefault();
        $location.path("/new");
    }

    $scope.editUser = function($event, userId) {
        $event.preventDefault();
        var url = "/edit/" + userId;
        $location.path(url);
    }

    $scope.deleteUser = function($event, userId) {
        $event.preventDefault();
        userMngService.deleteUser("/users" , Number(userId));
        getUsers();
        $location.path("/");
    }
}]);