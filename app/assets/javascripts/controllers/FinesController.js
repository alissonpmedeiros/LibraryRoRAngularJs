var controllers;

controllers = angular.module('controllers');
controllers.controller("FinesController", [
    '$scope', '$routeParams', '$location', '$resource', 'FinesService', 'FineService', 'BookService', 'UserService',
    function($scope, $routeParams, $location, $resource, FinesService, FineService, BookService, UserService) {
        $scope.loadFines = function(){
            $scope.fines = [];
            $scope.fines = FinesService.query();
        }

        $scope.findFine = function() {
            $scope.fine = FineService.get({fineId: $routeParams.fineId});
            $scope.fine.$promise.then(function(data) {
                $scope.user = UserService.get({userId: data.loan.user_id});
                $scope.admin = UserService.get({userId: data.loan.admin_id});
                $scope.book = BookService.get({bookId: data.loan.book_id});

            });
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