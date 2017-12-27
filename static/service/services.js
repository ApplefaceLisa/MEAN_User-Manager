angular.module("customServices", [])
.factory("pagerService", function() {
    // service definition
    var service = {};
    service.getPager = getPager;
    return service;

    // service implementation
    /* generate array of number from start(inclusive) to end(inclusive) */
    function range(start, end) {
        return Array.from(Array(end-start+1), (_, i) => start + i);
    }

    /* @totalItems : total number
     * @currentPage
     * @pageSize
    */
    function getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        /* for delete users
        if (currentPage > totalPages) {
            currentPage = currentPage > 1 ? currentPage - 1 : 1;
        }
        */

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = range(startPage, endPage);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
})
.factory("userMngService", ["$http", function($http) {
    var service = {};

    /* for pagination
    var pagesize = 10;
    var currentpage = 1;

    function setPagesize(size) {
        pagesize = size || 10;
        currentpage = 1;
    }

    function setPage(page) {
        if (currentpage !== page) {
            currentpage = page || currentpage;
        }
    }

    function getPagesize() {
        return pagesize;
    }

    function getPage() {
        return currentpage;
    }

    service.setPage = setPage;
    service.setPagesize = setPagesize;
    service.getPage = getPage;
    service.getPagesize = getPagesize;
    */

    /************************************************/
    /* RESTful API */
    service.getUsers = function(url) {
        return $http({
            method : "GET",
            url : url
        });
    };

    service.getUserById = function(url, id) {
        url += "/" + id;
        return $http({
            method : "GET",
            url : url
        });
    };

    service.updateUser = function(url, id, user) {
        url += "/" + id;
        return $http({
            method : "PUT",
            url : url,
            data : user
        });
    };

    service.createUser = function(url, user) {
        return $http({
            method : "POST",
            url : url,
            data : user
        });
    };

    service.deleteUser = function(url, id) {
        url += "/" + id;
        return $http({
            method : "DELETE",
            url : url
        });
    };
    /************************************************/

    return service;
}]);