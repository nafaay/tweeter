// render all tweets from the array of tweets
const renderTweets = function(tweets) {
  for (let i = 0; i < tweets.length; i++) {
    const $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').append($tweet);
    $('#tweets-container').append('<br>');

  }
};

/**
 *function that creates a DOM article as a variable
  $tweet and its descendants, and return that variable
  this function will be called once we load the data
  from the internet, and at each time we submit a tweet.
 */
const createTweetElement = function(tweetObject) {
  const $tweet = $('<article>').addClass('tweet bord');
  const $header = $('<header>');
  const $avname = $('<div>')
    .addClass('avname');
  const $src = tweetObject.user.avatars;
  const $image = $('<img>').attr('src', $src);
  $avname.append($image)
    .append(tweetObject.user.name);
  const $handle = $('<div>')
    .text(tweetObject.user.handle)
    .addClass('handle');

  const $avnamehandle = $('<div>')
    .append($avname)
    .addClass('avnamehandle');
  $avnamehandle.append($handle);
  $header.text(tweetObject.content.text);
  $header.append($avnamehandle);

 
  const $footer = $('<footer>');
  const $timeago = timeago.format(`${tweetObject.created_at}`);
  const $dateago = $('<div>')
    .append($timeago)
    .addClass('dateago');

  const $ftAwesomeHeart   = $('<i>').addClass('fas fa-heart');
  const $ftAwesomeFlag    = $('<i>').addClass('fas fa-flag');
  const $ftAwesomeTwitterr = $('<i>').addClass('fab fa-twitter');


  const $fontawesome = $('<div>').addClass('fontawesome');
  $fontawesome.append($ftAwesomeHeart, $ftAwesomeFlag, $ftAwesomeTwitterr);
  $footer.append($dateago, $fontawesome);
  $tweet.append($header, $footer);
  return $tweet;
};

/**
 * Here we can use our functions after the document is ready
 */
$(document).ready(function() {
  /**
   * function that will use some charcteristics of jQuery to manipulate
   * the DOM, like hover, addClass, removeClass...etc
   */
  const manipulateDOM = function() {
    $('article').hover(function() {
      $(this).css("box-shadow", "5px 10px #888888");
    }, function() {
      $(this).removeClass("bord");
      $(this).css("box-shadow", "5px 10px #f4f1ec");
      $(this).addClass("bord");
    });
    // Clear textarea after submitting tweet.
    $('#tweet-text').val("");
    
    const $colorElement = $('.fa-heart').css('color');
    $('.fa-heart').hover(function() {
      $(this).css("color", "#ff6666");
    }, function() {
      $(this).css("color", $colorElement);
    });

    $('.fa-flag').hover(function() {
      $(this).css("color", "#ff6666");
    }, function() {
      $(this).css("color", $colorElement);
    });

    $('.fa-twitter').hover(function() {
      $(this).css("color", "#ff6666");
    }, function() {
      $(this).css("color", $colorElement);
    });

  };

  /**
   * $.ajax is asynchronous, we have to encapsulate all the code after
   * inside the call back to avoid having undefined variables
   */
  $('.error').hide();
  const BASE_URL = "http://localhost:8080/tweets";
  let data = [];
  $.ajax(BASE_URL, {
    "user": "user", "content": "content", "created_at": "created_at"
  })
    .done(function(dataTweets) {
      data = dataTweets;
      renderTweets(data);
      manipulateDOM();
      $("form").on("submit", function(event) {
        event.preventDefault();
        let $text = $(this).serialize();
        $text = $text.substring(5);
        $text = decodeURI($text);
        $text = $text.replace(/%20/g, " ")
          .replace(/%C3/g, " ")
          .replace(/%A8/g, " ")
          .replace(/%3A/g, " ")
          .trim();
        if ($text.trim().length === 0) {
          $('.empty').show();
        } else if ($text.trim().length >= 140) {
          $('.long').show();
        } else {
          if ($text.length >= 80) {
            let $text1 = $text.substring(0, 80) + '\n';
            $text = $text1 + $text.substring(81, $text.length);
          }
          $('.error').hide();
          $('#tweets-container').empty();
          data.push({
            "user":
            {
              "name": "Youssef",
              "avatars": "https://avatars.dicebear.com/api/personas/wwwwwwwwwwwwwur-custom-seed.svg",
              "handle": "@nafaay"
            },
            "content": {
              "text": $text
            },
            "created_at": Date.now()
          });
          renderTweets(data.reverse());
          manipulateDOM();
        }
      });
    });
});