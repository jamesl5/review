// Initialize Parse app
Parse.initialize('5ZUKzcsOobn0VZza2IcvHdiAAv2LxHajSWqFmBX6', 'rqwnj98pPdSTOeKPIGKAy3Oawd5JCmEKpyQLEiat');

var Review = Parse.Object.extend('Review');
$('#average').raty({ score: 3 });

// Click event when form is submitted
$('form').submit(function() {
	
	var review = new Review();
	var rating = parseInt($('#review_rating').val(), 10);
	review.set('review_title', $('#review_title').val());
	review.set('review_body', $('#review_body').val());
	review.set('review_rating', rating);
	//review.set("review_rating", number);
	review.save(null, {
		success:getData
	})
	return false
})



// Write a function to get data
var getData = function() {
	

	// Set up a new query for our Music class
	var query = new Parse.Query(Review)

	// Set a parameter for your query -- where the website property isn't missing
	// query.notEqualTo('title', '')

	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/
	
	query.find({
		success:function(results) {
			buildList(results)
		} 
	})
}

// A function to build your list
var buildList = function(data) {
	// Empty out your ordered list
	$('ul').empty()
	var total;
	// Loop through your data, and pass each element to the addItem function
	data.forEach(function(d, total){
		addItem(d, total);
	})
}
var total = function(item){
	var rating = item.get('review_rating')
}

// This function takes in an item, adds it to the screen
var addItem = function(item, total) {
	// Get parameters (website, band, song) from the data item passed to the function
	var title = item.get('review_title');
	var body = item.get('review_body');
	var rating = item.get('review_rating');
	total += rating;
	// Append li that includes text from the data item
	var li = $('<li>' + title + '</li> ');
	
	// Create a button with a <span> element (using bootstrap class to show the X)
	var button = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>');
	
	// Click function on the button to destroy the item, then re-call getData
	button.click(function() {
		item.destroy({
			success:getData
		})
	})
	
	// Append the button to the li, then the li to the olF
	li.append(button);
	$('ul').append(li)
	
}

// Call your getData function when the page loads
getData()