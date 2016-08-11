var controllers;

controllers = angular.module('controllers');
controllers.controller("UsersController", [
    '$scope', '$routeParams', '$location', '$resource', 'UsersService', 'UserService', 'UserSearchService', '$auth',
    function($scope, $routeParams, $location, $resource, UsersService, UserService, UserSearchService, $auth) {

        $scope.search = function(searchTerm) {
            $scope.users = [];
            $scope.loading = true;
            if (searchTerm.length < 3) {
                return;
            }
            $scope.users = UserSearchService.searchUsers({keywords: searchTerm});
        }



        $scope.loadUsers  = function() {
            $scope.users = [];
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

        $scope.saveUser = function(){
            //console.log("Saving:" + $scope.author);
            UsersService.create({user: $scope.user}, function() {
                $location.path('/users');
            }, function(error){
                console.log(error);
            });
        }

        $scope.findUser = function() {
            $scope.user = UserService.get({userId: $routeParams.userId});
            //console.log($scope.author);
        }

        $scope.updateUser = function() {
            //console.log($scope.author);
            UserService.update({userId: $scope.user.id}, {user: $scope.user}, function() {
                //console.log("Saved:" + $scope.author);
                $scope.showUser($scope.user.id);
            }, function(error) {
                console.log("Error:" + error);
            });
        }


        // LINKS
        $scope.newUser = function() {
            $location.path('/users/new');
        }

        $scope.showUser = function(userId) {
            $location.path('/users/' + userId);
        }

        $scope.editUser = function(userId) {
            $location.path('/users/' + userId + '/edit');
        }

        $scope.back = function() {
            $location.path('/users');
        };

        if($routeParams.userId){
            $scope.findUser();
        }


    }
]);