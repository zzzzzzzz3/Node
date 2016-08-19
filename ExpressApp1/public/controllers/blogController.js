var app = angular.module("myApp", []);
app.controller("blogController", function ($scope,$http) {
    $scope.removeBlog = function (blog_id) {
        console.log("---------removing---------");
        $http(
            {
                method: 'POST',
                url: '/blog/romove',
                headers: { "Accept": "application/json; odata=verbose" },
                data:blog_id
            }
        ).then(function (response) {
            console.log("---------removing finish---------");
            if (response.data.success) {
                console.log("---------removing success---------");
                window.location.href = "/";
            }
            window.location.href = "/";
            }, function (error) {
                if (error) {
                    console.log("---------removing error---------");
                    return;
                }
        });
    }
});