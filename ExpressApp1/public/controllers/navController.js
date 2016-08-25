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
            $scope.isSetting = false;
            $('#mymodal').modal('hide');
            window.location.href = "/";
            }, function (res) { });
    }
    $scope.update = function (blog_id,blog_title,blog_content) {
        $http({
            method: "POST",
            url: "/blogupdate",
            headers: { "Accept": "application/json;odata=verbose" },
            data: { id: blog_id, title: blog_title, content: blog_content }
        }).then(function (res) {
            $scope.SettingSuccess = res.data.success;
            $('#mymodal').modal('hide');
            window.location.href = "/";
        }, function (res) { });
    }
    $scope.setting = function (blog) {
        $('#mymodal').modal('show');
        $scope.id = blog.id;
        $scope.title = blog.title;
        $scope.content = blog.content;
    }
});