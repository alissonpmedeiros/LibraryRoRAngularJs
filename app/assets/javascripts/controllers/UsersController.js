var controllers;

controllers = angular.module('controllers');
controllers.controller("UsersController", [
    '$scope', '$routeParams', '$location', '$resource', 'UsersService', 'UserService', 'UserSearchService',
    function($scope, $routeParams, $location, $resource, UsersService, UserService, UserSearchService) {
        $scope.users = [];

        $scope.search = function(searchTerm) {
            $scope.loading = true;
            if (searchTerm.length < 3) {
                return;
            }
            $scope.users = UserSearchService.searchUsers({keywords: searchTerm});
        }


        $scope.loadUsers  = function() {
            $scope.users = UsersService.query();
            //console.log($scope.users);
        }

        $scope.deleteUser = function(userId) {
            if(confirm("Are you sure that you want destroy this User?")){
                UserService.delete({userId: userId}, function() {
                    $scope.loadUsers();
                    $location.path('/users');
                }, function(error){
                    console.log(error);
                });
            }
        }


        $scope.findUser = function() {
            $scope.user = UserService.get({userId: $routeParams.userId});
            //console.log($scope.author);
        }


        if($routeParams.userId){
            $scope.findUser();
        }
    }
]);