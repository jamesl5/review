
//This file is for building simple review page in which people can post up their reviews and rate them.


// Initialize Parse app
Parse.initialize('5ZUKzcsOobn0VZza2IcvHdiAAv2LxHajSWqFmBX6', 'rqwnj98pPdSTOeKPIGKAy3Oawd5JCmEKpyQLEiat');

var Review = Parse.Object.extend('Review');

//created instance outside of other functions in order to prevent spamming of reviews.
//(need to refresh the page to write more reviews)
var review = new Review();		

		
	$('#rating').raty({ 
		path: 'images',
		score: 3
		
	});
	// Click event when form is submitted
	$('form').submit(function() {
		//create review instance.
		
		var rating = $('#rating').raty('score');
		var title = $('#review_title').val();
		var body = $('#review_body').val();
		review.set('review_title', title);
		review.set('review_body', body);
		review.set('review_rating', rating);
		review.set('review_like', 0);
		review.set('review_dislike', 0);
		review.save(null, {
			success:getData
		}).then(function(){
			$('#rating').raty('set', {
				option:3
			});
			$('#review_title').val('');
			$('#review_body').val('');
		})
		return false
	})

	//function to get data from the database
	var getData = function() {
		//make an instance to look through data
		var query = new Parse.Query(Review)
		//find data(any), and start building list
		query.find({
			success:function(results) {
				buildList(results)
			} 
		})
	}

	//build up list of reviews
	var buildList = function(data) {

		//empty out the review list section
		$('section').empty()
		var total = 0;
		
		//append each data in the database and add the total rating values.
		data.forEach(function(d){
			total += addItem(d);
		})
		//find the average rating and post stars on the page
		var avg = total/data.length;
		$('#average').raty({ 
			path: 'images',
			readOnly : true,
			score : avg
		});
	}

	//add each review in the list
	var addItem = function(item) {

		//elements to be added on each review.
		var title = item.get('review_title');
		var body = item.get('review_body');
		var rating = item.get('review_rating');
		var upVote = item.get('review_like');
		var totalVote = item.get('review_dislike')+upVote;
		var thumbUp = $("<button class='btn'><span class='vote'><i class='fa fa-thumbs-o-up fa-2x'></i></span></button>");
		var thumbDown = $("<button class='btn'><span class='vote'><i class='fa fa-thumbs-o-down fa-2x'></i></span></button>");
		var button = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>');
		var stars = $("<span id = 'stars'>").raty({ 
						path: 'images',
						readOnly : true,
						score : rating
					});	
		
		//create a form for a review and append to the review section
		var form = $("<form id='review'></form>");
		$('#reviews').append(form);
		//create a row and columns
		var row = $("<div class='row'></div>");
		var col1 = $("<div id= 'rate' class='col-sm-11'></div>");
		var col2 = $("<div id= 'cross' class='col-sm-1'></div>");
		
		//append a row and comlumns
		(form).append(row);
		(row).append(col1);
		(row).append(col2);
		//append rating stars and delete button
		(col1).append(stars);
		(col2).append(button);
		
		//append another row for title
		row = $("<div class='row'><div id='title'></div></div>");
		(form).append(row);
		$('div:last').text(title);
		
		//append another row for body
		row = $("<div class='row'><div id='body' ></div></div>");
		(form).append(row);
		$('div:last').text(body);
		
		//create and append a row & comlumns
		row = $("<div class='row'></div>");
		col1 = $("<div id= 'vote_result' class='col-sm-10'></div>");
		col2 = $("<div id= 'icon' class='col-sm-2'></div>");
		(form).append(row);
		(row).append(col1);
		(row).append(col2);
		
		//append vote counts and vote buttons
		(col1).append(upVote + " out of " + totalVote + " found this review helpful ");
		(col2).append(thumbUp);
		(col2).append(thumbDown);
		
		//destroys a review if delete button is clicked
		button.click(function() {
			item.destroy({
				success:getData
			})
			return false;
		});
		
		//increment either like count or dislike count depending on which thumb is clicked.
		thumbUp.click(function(){
			item.increment('review_like');
			item.save(null, {
				success:getData
			});
			return false;
		});
		thumbDown.click(function(){
			item.increment('review_dislike');
			item.save(null, {
				success:getData
			});
			return false;
		});
		
		//return the rating value to sum up.
		return rating;
	}

//finally get data to build lists when page is ready
$(document).ready(function(){
	getData();
});
