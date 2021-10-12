

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$( document ).ready(function() {
  // Fetch tweets that have been created and tweets that are in Database
  const fetchTweets = function () {
    $.ajax({
      url: "/tweets",
      method: 'GET',
      data: $(".formNewTweet").serialize(),
      dataType: 'json',
      success: function (data) {
        renderTweets(data);
      }
    })
  }

  fetchTweets();

  const addingTweet = {
    // Post successful tweet 
    successfulTweet: function (event) {
      //Reset character counter to 140 
      $('.counter').text(140)
      const tweet = $('textarea');
      event.preventDefault();
      //  Error handling for tweet that registered as null
      if(tweet.val() === null) {
        $(".formNewTweet").prepend($("<div>").addClass("isa_error").text("Please try again").fadeIn(200).fadeOut(4500));
        return;
      }
      // Error handling for tweet that exceeds 140 characters
      if(tweet.val().length > 140) {
        $(".formNewTweet").prepend($("<div>").addClass("isa_error").text("Characters must not exceed 140....Chatter box").fadeIn(200).fadeOut(4500));
        return;
      }
      // Error handling for no input
      if(!tweet.val()) {
        $(".formNewTweet").prepend($("<div>").addClass("isa_error").text("You can't tweet thin air. Please enter a tweet").fadeIn(200).fadeOut(4500));
        return;
      }
      // Post successful tweet
      const serializedData = $(".formNewTweet").serialize();
      $.post("/tweets", serializedData, function () {
        $("textarea").val("");
        fetchTweets();
  });
  }
}
$(".formNewTweet").submit(addingTweet.successfulTweet);

  //Create container for tweet and add content
  const createTweetElement = function (tweet) {

    const $article = $("<article>").addClass("userTweet")
    const $header = $('<header>').addClass("user");
    const $name = $('<text>').addClass("name").text(tweet.user.name);
    const $userIcon = $('<i>').addClass('far fa-id-card');
    const $username = $('<text>').addClass("username").text(tweet.user.handle);
    const $tweet = $('<p>').addClass("tweet").text(tweet.content.text);
    const $footer = $('<footer>').addClass("tweetTime")
    const $time = $('<text>').addClass("time").text(timeago.format(tweet.created_at));
    const $icons = $('<div>').addClass("icons");
    const $icon1 = $('<i>').addClass("fas fa-heart");
    const $icon2 = $('<i>').addClass("fas fa-retweet");
    const $icon3 = $('<i>').addClass("fas fa-flag");

    $footer.append($time, $icons)
    $icons.append($icon1, $icon2, $icon3)
    $header.append($userIcon, $name, $username);
    $article.append($header, $tweet, $footer);

    
    return $article
    
  }

// Renders new tweets and old tweets
  const renderTweets = function(tweets) {
    const $tweetContainer = $(".tweets");
    $tweetContainer.empty();

    // repopulate tweet container
    for( const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      // Add tweets based
      $tweetContainer.prepend($tweet);
    }
}

// Show hidden container to create tweets
$("#link").click(function () {
  $(".formNewTweet").slideDown();
});

});
