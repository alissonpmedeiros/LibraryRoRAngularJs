var controllers;

controllers = angular.module('controllers');
controllers.controller("CategoriesController", [
    '$scope', '$routeParams', '$location', '$resource', 'CategoriesService',
    function($scope, $routeParams, $location, $resource, CategoriesService) {
        $scope.loadCategories = function(){
            $scope.categories = [];
            $scope.categories = CategoriesService.query();
        }
        $scope.loadCategories();
    }
]);