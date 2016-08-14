var controllers;

controllers = angular.module('controllers');
controllers.controller("LoansController", [
    '$scope', '$routeParams', '$location', '$resource', 'LoansService', 'LoanService','LoansSearchService',
    function($scope, $routeParams, $location, $resource, LoansService, LoanService, LoansSearchService) {
        $scope.searchLoan = function(searchTerm) {
            $scope.loans= [];
            $scope.loading = true;
            if (searchTerm.length < 3) {
                return;
            }
            $scope.loans = LoansSearchService.searchLoan({keywords: searchTerm});
        }

        $scope.loadLoans = function() {
            $scope.loans = [];
            $scope.loans = LoansService.query();
        };

        $scope.deleteLoan = function(loanId){
            if(confirm("Are you sure that you want destroy this Loan?")){
                LoanService.delete({loanId: loanId}, function() {
                    $scope.loadLoans();
                    $location.path('/loans');
                }, function(error){
                    console.log(error);
                });
            }
        };

        $scope.saveLoan = function() {
            LoansService.create({loan: $scope.loan}, function() {
                $location.path('/loans');
            }, function(error){
                console.log(error);
            });
        };

        $scope.findLoan = function() {
            $scope.loan = LoanService.get({loanId: $routeParams.loanId});
            console.log($scope.loan);
        }

        $scope.updateLoan = function() {
            LoanService.update({loanId: $scope.loan.id}, {loan: $scope.loan}, function() {
                $location.path('/loans');
            }, function(error){
                console.log(error);
            });
        }


        // LINKS
        $scope.newLoan = function() {
            $location.path('/loans/new');

        }

        $scope.showLoan = function(loanId) {
            $location.path('/loans/' + loanId);
        }

        $scope.editLoan = function(loanId) {
            $location.path('/loans/' + loanId + '/edit')
        }

        if($routeParams.loanId){
            $scope.findLoan();
        }

        $scope.loadLoans();

    }
]);