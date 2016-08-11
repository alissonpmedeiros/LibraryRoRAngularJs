var controllers;

controllers = angular.module('controllers');
controllers.controller("NavController", ['$scope', '$location',
    function($scope, $location) {

        $scope.$on('auth:login-error', function(ev, reason) {
          $scope.error = reason.errors[0];
        });


        // LINKS
        $scope.index = function(){
            $location.path('/');
        }
        $scope.users = function(){
            $location.path('/users');
        }
        $scope.books = function(){
            $location.path('/books');
        }
        $scope.categories = function(){
            $location.path('/categories');
        }
    }
]);
