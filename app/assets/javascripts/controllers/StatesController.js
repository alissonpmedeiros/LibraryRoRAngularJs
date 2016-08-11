var controllers;

controllers = angular.module('controllers');
controllers.controller("StatesController", [
    '$scope', '$routeParams', '$location', '$resource', 'StatesService',
    function($scope, $routeParams, $location, $resource, StatesService) {

        $scope.loadStates = function() {
            $scope.states = [];
            $scope.states = StatesService.query();
        };



    }
]);