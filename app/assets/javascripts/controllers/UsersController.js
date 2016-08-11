var controllers;

controllers = angular.module('controllers');
controllers.controller("UsersController", [
    '$scope', '$routeParams', '$location', '$resource', 'UsersService', 'UserService', 'UserSearchService', '$rootScope',
    function($scope, $routeParams, $location, $resource, UsersService, UserService, UserSearchService, $rootScope) {

        $rootScope.$on('auth:registration-email-success', function(ev, message) {
            console.log(user.id);
            $scope.saveAddress($scope.address);
            $location.path('/user_login');

        });

        $rootScope.$on('auth:auth-registration', function(ev, user) {

            console.log(user.email);
            alert('new user registered through oauth:' + user.email);
        });

        $rootScope.$on('auth:login-success', function() {
            $location.path('/');
        });

        $scope.$on('auth:login-error', function(ev, reason) {
            $scope.error = reason.errors[0];
        });

        $scope.$on('auth:registration-email-error', function(ev, reason) {
            alert("Registration failed: " + reason.errors[0]);
        });


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

        $scope.saveAddress = function(address) {
            console.log(address);
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