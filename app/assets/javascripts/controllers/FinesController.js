var controllers;

controllers = angular.module('controllers');
controllers.controller("FinesController", [
    '$scope', '$routeParams', '$location', '$resource', 'FinesService', 'FineService',
    function($scope, $routeParams, $location, $resource, FinesService, FineService) {
        $scope.loadFines = function(){
            $scope.fines = [];
            $scope.fines = FinesService.query();
        }

        $scope.findFine = function() {
            $scope.fine = FineService.get({fineId: $routeParams.fineId});
            console.log($scope.fine);
        }

        $scope.showFine = function(fineId) {
            $location.path('/fines/' + fineId);
        }

        // links
        $scope.back = function() {
            $location.path('/fines');
        }


        if($routeParams.fineId){
            $scope.findFine();
        }

    }
]);