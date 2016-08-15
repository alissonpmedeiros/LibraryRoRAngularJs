var controllers;

controllers = angular.module('controllers');
controllers.controller("LoansController", [
    '$scope', '$routeParams', '$location', '$resource', 'LoansService', 'LoanService','LoansSearchService', 'UsersService', 'UserService', 'BooksService',
    function($scope, $routeParams, $location, $resource, LoansService, LoanService, LoansSearchService, UsersService, UserService, BooksService) {
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

        $scope.loadUsers = function() {
            $scope.users = [];
            $scope.users = UsersService.query();
        }

        $scope.loadBooks = function() {
            $scope.books = [];
            $scope.books = BooksService.query();
        }


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

        $scope.findUser = function() {
            $scope.userFind = UserService.get({userId: $scope.loan.user_id});
            $scope.userFindId;
            $scope.userFindNumLoans;
            $scope.userFind.$promise.then(function(data){
                $scope.userFindId = data.id;
                $scope.userFindNumLoans = data.number_loans;
                console.log("user selected loans: " + $scope.userFindNumLoans);
            });

        }
        $scope.validLoan = function(){
            $scope.findUser();
            if($scope.userFindNumLoans < 5){
                console.log("valid");
                return true;
            }
            else{
                console.log("invalid");
                return false;
            }
        }

        $scope.updateUser = function() {
            UserService.update({userId: $scope.userFindId}, {user: $scope.userFind}, function() {
            }, function(error){
                console.log(error);
            });
        }

        $scope.saveLoan = function() {
            $scope.userFind = UserService.get({userId: $scope.loan.user_id});
            $scope.valid;
            $scope.userFind.$promise.then(function(data){
                if(data.number_loans < 5){
                    $scope.valid = true;
                    $scope.userFindId = data.id;

                }
                else {
                    $scope.valid = false;
                }
                if($scope.valid){
                    console.log("userFindLoans Before: " + data.number_loans);
                    data.number_loans = data.number_loans + 1;
                    console.log("userFindLoans After: " + data.number_loans);
                    $scope.updateUser();
                    $location.path('/loans');
                }
                else{
                    alert("This user have 5 loans and is permited just 5 loans per user!");
                }
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