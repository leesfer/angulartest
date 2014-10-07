'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

	.controller('LandingPageController', [function() {

	}])

	.controller('WaitListController', ['$scope', 'partyService', 'textMessageService', 'authService', function($scope, partyService, textMessageService, authService){

		//Bind user's parties to $scope.parties
		authService.getCurrentUser().then(function(user){
			if (user) {
				$scope.parties = partyService.getPartiesByUserId(user.id);
			};
		})

		// Store data from the waitlist form
		$scope.guest = {name: '', phone: '', size: '', done: false, notified: 'No'};

		//Save a new party to the waitlist
		$scope.saveParty = function() {
			partyService.saveParty($scope.guest, $scope.currentUser.id);
			$scope.guest = {name: '', phone: '', size: '', done: false, notified: 'No'};
		};

		// Function to send a text message to a guest
		$scope.sendTextMessage = function(party) {
			textMessageService.sendTextMessage(party, $scope.currentUser.id);
		};

	}])
	
	.controller('AuthController', ['$scope', 'authService', function($scope, authService){

		// Object bound to inputs on the register and log in pages
		$scope.user = {email: '', password: ''};

		// Method to register a new user using the authService
		$scope.register = function() {
			authService.register($scope.user);
		};

		// Method to log in a user using the authService
		$scope.login = function() {
			authService.login($scope.user);
		};

		// Method to log out a user using the authService
		$scope.logout = function() {
			authService.logout();
		};

	}]);