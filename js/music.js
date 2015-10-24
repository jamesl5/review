// Initialize Parse app
Parse.initialize('ANpCWog60qwFxS0rvG42NF7F2Y0GcvpUVp8fiNCe', 'Z1T03ywPP80BHlZdXI7UwcrdeGQVnFJHVRBcTEDN');

// Create a new sub-class of the Parse.Object, with name "Music"
var Music = Parse.Object.extend('Music');

// Create a new instance of your Music class 
var song = new Music();

// Set a property 'band' equal to a band name
/*song.set('band', 's.w');

// Set a property 'website' equal to the band's website
song.set('website', 'www.1313.com');
    
// Set a property 'song' equal to a song
song.set('song', 'song');

// Save your instance of your song -- and go see it on parse.com!
song.save();*/

// Click event when form is submitted
$('form').submit(function() {

	// Create a new instance of your Music class 
	
	var song2 = new Music();

	// For each input element, set a property of your new instance equal to the input's value
	song2.set('band', $('#bandName').val());
	song2.set('website', $('#website').val());
	song2.set('song', $('#bestSong').val());

	song2.save();

	// After setting each property, save your new instance back to your database

	
	return false
})



// Write a function to get data
var getData = function() {
	

	// Set up a new query for our Music class
	var query = new Parse.Query(ToDo);

	// Set a parameter for your query -- where the website property isn't missing
	query.equalTo('importance')


	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/
	query.find({
		success:function(results) {
			// Do something with your array of results
		}
	})
}

// A function to build your list
var buildList = function(data) {
	// Empty out your unordered list
	
	// Loop through your data, and pass each element to the addItem function

}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters (website, band, song) from the data item passed to the function

	
	// Append li that includes text from the data item


	
	// Time pending, create a button that removes the data item on click
	
}

// Call your getData function when the page loads


