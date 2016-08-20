var app = angular.module("myApp", []);
app.controller("blogController", function ($scope, $http) {
    
    $scope.removeBlog = function (blog_id) {
        $scope.delete = true;
        $scope.deletemsg = "正在删除……";
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
                $scope.deletemsg = "删除成功";
                //window.location.href = "/";
            }
            window.location.href = "/";
            }, function (error) {
                if (error) {
                    console.log("---------removing error---------");
                    $scope.deletemsg = "删除失败";
                    return;
                }
        });
    }
});