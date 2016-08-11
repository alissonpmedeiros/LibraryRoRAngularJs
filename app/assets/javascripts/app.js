
var controllers, library;

controllers = angular.module('controllers', []);

library = angular.module('library',
    [
        'ngCookies',
        'ipCookie',
        'ui.router',
        'templates',
        'ngRoute',
        'ngResource',
        'controllers',
        'ng-token-auth'

    ]
);

//routes

library.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('auth:login-success', function() {
        $location.path('/');
    });

    $rootScope.$on('auth:registration-email-success', function(ev, message) {
        $location.path('/');
        alert("A registration email was sent to " + message.email);
    });
    $rootScope.$on('auth:registration-email-error', function(ev, reason) {
        alert("Registration failed: You have to provide correct email");
    });
}]);




library.config([
    '$routeProvider', function($routeProvider, $authProvider) {
        return $routeProvider.when('/', {           // HOME ROUTE
            templateUrl: "home/index.html",
            controller: "HomeController"
        }).when('/books', {                         // BOOKS ROUTES
            templateUrl: "book/index.html",
            controller:  "BooksController"
        }).when('/books/new', {
            templateUrl: "book/new.html",
            controller:  "BooksController"
        }).when('/books/:bookId', {
            templateUrl: "book/show.html",
            controller:  "BooksController"
        }).when('/books/:bookId/edit', {
            templateUrl: "book/edit.html",
            controller:  "BooksController"
        }).when('/authors', {                       //AUTHORS ROUTES
            templateUrl: "author/index.html",
            controller:  "AuthorsController"
        }).when('/authors/new', {
            templateUrl: "author/new.html",
            controller:  "AuthorsController"
        }).when('/authors/:authorId', {
            templateUrl: "author/show.html",
            controller:  "AuthorsController"
        }).when('/authors/:authorId/edit', {
            templateUrl: "author/edit.html",
            controller:  "AuthorsController"
        }).when('/categories', {                       //CATEGORIES ROUTES
            templateUrl: "category/index.html",
            controller:  "CategoriesController"
        }).when('/user_login', {                        // AUTHENTICATE USER
            templateUrl: "user/_login.html",
            controller:  "NavController"
        }).when('/admin_login', {                     // AUTHENTICATE ADMIN
            templateUrl: "user/_login.html",
            controller:  "NavController"
        }).when('/user_register', {
            templateUrl: "user/_register.html",
            controller:  "NavController"
        }).otherwise({                              //OTHERWISE ROUTE
            redirectTo: '/'
        });
    }
]);

