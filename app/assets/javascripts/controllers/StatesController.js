var controllers;

controllers = angular.module('controllers');
controllers.controller("StatesController", [
    '$scope', '$routeParams', '$location', '$resource', 'StatesService', 'StateService', 'StateSearchService',
    function($scope, $routeParams, $location, $resource, StatesService, StateService, StateSearchService) {

        $scope.searchState = function(searchTerm) {
            $scope.states = [];
            $scope.loading = true;
            if (searchTerm.length < 3) {
                return;
            }
            $scope.states = StateSearchService.searchState({keywords: searchTerm});
        }

        $scope.loadStates = function() {
            $scope.states = [];
            $scope.states = StatesService.query();
            //console.log($scope.books);
        };

        $scope.deleteState = function(stateId){
            if(confirm("Are you sure that you want destroy this State?")){
                StateService.delete({stateId: stateId}, function() {
                    $scope.loadStates();
                    $location.path('/states');
                }, function(error){
                    console.log(error);
                });
            }
        };


        $scope.saveState = function() {
            StatesService.create({state: $scope.state}, function() {
                $location.path('/states');
            }, function(error){
                console.log(error);
            });
        };

        $scope.findState = function() {
            $scope.state = StateService.get({stateId: $routeParams.stateId});
            console.log($scope.state);
        }

        $scope.updateState = function() {
            StateService.update({stateId: $scope.state.id}, {state: $scope.state}, function() {
                $location.path('/states');
            }, function(error){
                console.log(error);
            });
        }


        // LINKS
        $scope.newState = function() {
            $location.path('/states/new');

        }

        $scope.showState = function(stateId) {
            $location.path('/states/' + stateId);
        }

        $scope.editState = function(stateId) {
            $location.path('/states/' + stateId + '/edit')
        }

        $scope.back = function() {
            $location.path('/states');
        };

        if($routeParams.stateId){
            $scope.findState();
        }



    }
]);