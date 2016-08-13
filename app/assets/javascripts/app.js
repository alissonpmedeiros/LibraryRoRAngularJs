
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
            templateUrl: "user_session/_login.html",
            controller:  "UsersSessionController"
        }).when('/admin_login', {                       // AUTHENTICATE ADMIN
            templateUrl: "user_session/_login.html",
            controller:  "UsersSessionController"
        }).when('/user_register', {
            templateUrl: "user_session/_register.html",
            controller:  "UsersSessionController"
        }).when('/users', {                             // USERS
            templateUrl: "user/index.html",
            controller:  "UsersController"
        }).when('/register_address', {                  // REGISTER ADDRESS FOR
            templateUrl: "user_session/_register_address.html",
            controller:  "UsersSessionController"
        }).when('/loans', {                             // LOANS
            templateUrl: "loans/index.html",
            controller:  "LoansController"
        }).otherwise({                                  //OTHERWISE ROUTE
            redirectTo: '/'
        });
    }
]);

