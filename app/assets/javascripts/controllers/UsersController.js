var controllers;

controllers = angular.module('controllers');
controllers.controller("UsersController", [
    '$scope', '$routeParams', '$location', '$resource', 'UsersService', 'UserService', 'UserSearchService', 'LoansService', 'LoanService',
    function($scope, $routeParams, $location, $resource, UsersService, UserService, UserSearchService, LoansService, LoanService) {
        $scope.users = [];

        $scope.search = function(searchTerm) {
            $scope.loading = true;
            if (searchTerm.length < 3) {
                return;
            }
            $scope.users = UserSearchService.searchUsers({keywords: searchTerm});
        }


        $scope.loadUsers  = function() {
            $scope.users = UsersService.query();
            //console.log($scope.users);
        }

        $scope.showUserLoaned = function(loan) {
            $location.path('/user/loans/' + loan.id);
        }

        $scope.findUserLoaned = function() {
            $scope.userLoaned = LoanService.get({loanId: $routeParams.loanId});
        }

        if($routeParams.loanId){
            $scope.findUserLoaned();
        }

        $scope.loadUserLoans = function() {
            $scope.userLoans = LoansService.query();
        }

        $scope.deleteUser = function(userId) {
            if(confirm("Are you sure that you want destroy this User?")){
                UserService.delete({userId: userId}, function() {
                    $scope.loadUsers();
                    $location.path('/users');
                }, function(error){
                    console.log(error);
                });
            }
        }

        $scope.backUserLoans = function() {
            $location.path('/user/loans');
        }

        $scope.findUser = function() {
            $scope.user = UserService.get({userId: $routeParams.userId});
            //console.log($scope.author);
        }


        if($routeParams.userId){
            $scope.findUser();
        }
    }
]);