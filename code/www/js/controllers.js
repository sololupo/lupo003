angular.module('lupo.controllers', ['ionic', 'lupo.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $timeout, User, Recommendations) {
	


	// get first songs
	Recommendations.getNextSongs()
		.then(function() {
			$scope.currentSong = Recommendations.queue[0];	
		});
 
	// used for retrieving the next album image.
	// if there isn't an album image available next, return empty string
	$scope.nextAlbumImg = function() {
		if (Recommendations.queue.length > 1) {
			return	Recommendations.queue[1].image_large;
		}

		return '';
	}

	 	// function if song is Skipped or Favorited
	 	$scope.sendFeedback = function (bool) {


	 		/* Adding Favorited Songs */
	 		// first, add to favorites if they favorited
	 		if (bool) User.addSongToFavorites($scope.currentSong);


	 		// set variable for the current animation sequence
	 		$scope.currentSong.rated = bool;
	 		$scope.currentSong.hide = true;

	 		/* Shifting through Next Song from Recommendations */
	 		//prepare the next song
	 		Recommendations.nextSong();

	 		$timeout(function() {
	 			//$timeut to allow animation to complete
	 			$scope.currentSong = Recommendations.queue[0];
	 		}, 250);




		}

	  
})




/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User) {


	//get the list of our favorites from the user service
	$scope.favorites = User.favorites;

	// add method to remove a song
	$scope.removeSong = function(song,index) {
		User.removeSongFromFavorites(song, index);
	}

	$scope.username = User.username;


})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope, User, $window) {
	//expose number of favorites to the $scope
	$scope.favCount = User.favoriteCount;

	$scope.enteringFavorites = function () {
				User.newFavorites = 0;
				    console.log=('Favorites incremented to ' && User.newFavorites);

	}

	$scope.logout = function() {
		User.destroySession();

		// instead of using $state.go, we're going to redirect
		// reason: we need to ensure views aren't cached
		$window.location.href = 'index.html';
	}

})



.controller('SplashCtrl', function($scope, $state, User) {

  // attempt to signup/login via User.auth
  $scope.submitForm = function(username, signingUp) {
  	
    User.auth(username, signingUp).then(function(){
      // session is now set, so lets redirect to discover page
      $state.go('tab.discover');

    }, function() {
      // error handling here
      alert('Hmm... try another username.');

    });
  }

})

// end controllers
;