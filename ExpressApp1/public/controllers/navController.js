var app = angular.module('myApp', []);
app.controller('navController', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/blog',
        headers: { "Accept": "application/json; odata=verbose" }
    }).then(function (res) {
        $scope.blogs = res.data;
    }, function (res) {

    });

    $scope.removeBlog = function (blog_id) {
        $http({
            method: "POST",
            url: "/blogremove",
            headers: { "Accept": "application/json;odata=verbose" },
            data: { id: blog_id }
        }).then(function (res) {
            window.location.href = "/";
            }, function (res) { });
    }
});