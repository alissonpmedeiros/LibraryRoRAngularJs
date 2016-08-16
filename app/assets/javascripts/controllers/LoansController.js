var controllers;

controllers = angular.module('controllers');
controllers.controller("LoansController", [
    '$scope', '$routeParams', '$location', '$resource', 'LoansService', 'LoanService','LoansSearchService', 'UsersService', 'UserService', 'BooksService', 'BookService',
    function($scope, $routeParams, $location, $resource, LoansService, LoanService, LoansSearchService, UsersService, UserService, BooksService, BookService) {
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

        $scope.updateBook = function() {
            BookService.update({bookId: $scope.loan.book.id}, {book: $scope.loan.book}, function() {
            }, function(error){
                console.log(error);
            });
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
                if(data.number_loans < 5 && $scope.loan.book.quantity > 0){
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
                    console.log("book quantity before:" + $scope.loan.book.quantity );
                    $scope.loan.book.quantity -= 1;
                    console.log("book quantity after:" + $scope.loan.book.quantity );
                    console.log($scope.loan.book);

                    $scope.updateUser();
                    $scope.updateBook();

                    LoansService.create({loan: $scope.loan}, function() {
                        $location.path('/loans');
                    }, function(error){
                        console.log(error);
                    });


                }
                else if(data.number_loans === 5){
                    alert("This user have 5 loans and is permited just 5 loans per user!");
                }
                else {
                    alert("There isn't no other books for loaned");
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