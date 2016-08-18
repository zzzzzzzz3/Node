var app = angular.module("myApp", []);
app.controller("blogController", function ($scope,$http) {
    $scope.removeBlog = function (blog) {
        $http(
            {
                method: 'POST',
                url: '/blog/romove',
                header: { 'Content-Type': "utf-8"},
                data:blog
            }
        ).then(function (response) {

            }, function (error) {
                if (error) {

                    return;
                }
        });
    }
});