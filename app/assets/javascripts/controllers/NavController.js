var controllers;

controllers = angular.module('controllers');
controllers.controller("NavController", ['$scope', '$location', '$http', '$auth',
    function($scope, $location, $http, $auth) {




        // LINKS
        $scope.index = function(){
            $location.path('/');
        }
        $scope.authors = function(){
            $location.path('/authors');
        }
        $scope.books = function(){
            $location.path('/books');
        }
        $scope.categories = function(){
            $location.path('/categories');
        }
    }
]);
