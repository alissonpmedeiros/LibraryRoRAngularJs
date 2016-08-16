var controllers;

controllers = angular.module('controllers');
controllers.controller("UsersSessionController", [
    '$scope', '$routeParams', '$location', '$resource', 'UserService', 'StatesService', '$rootScope', 'AddressesService', '$window',
    function($scope, $routeParams, $location, $resource, UserService, StatesService, $rootScope, AddressesService, $window) {
        $scope.states = [];
        $scope.updateCurrentUser = function() {
            UserService.update({userId: $scope.user.id}, {user: $scope.user}, function() {
            }, function(error) {
                console.log(error);
            });
        }

        $scope.loadStates = function() {
            $scope.states = StatesService.query();
        }

        $scope.registerAddress = function() {
            $scope.address.user_id = $scope.user.id;
            $scope.user.address_registrable = true;
            $scope.updateCurrentUser();
            AddressesService.create({address: $scope.address}, function() {
                $location.path('/');
                $window.location.reload();
            }, function(error){
                console.log(error);
            });
        };
        $rootScope.$on('auth:registration-email-success', function(ev, message) {
            console.log($scope.address);
            $location.path('/');
            //force reload index page
            $window.location.reload();


        });

        $rootScope.$on('auth:auth-registration', function(ev, user) {
            console.log(user.email);
            alert('new user_session registered through oauth:' + user.email);
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

    }
]);