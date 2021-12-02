/**
 * Here we can use our functions after the document is ready
 */
$(document).ready(() => {
  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    for (let i = 0; i < tweets.length; i++) {
      const $tweet = createTweetElement(tweets[i]);
      $('#tweets-container').prepend($tweet);
    }
  };
  const getTweets = function () {
    $.get('/tweets', (data) => {
      renderTweets(data);
    });
  };

  getTweets();
  /**
   * function that will use some charcteristics of jQuery to manipulate
   * the DOM, like hover, addClass, removeClass...etc
   */

  const manipulateDOM = function () {
    const $colorElement = $('.fa-heart').css('color');
    $('.fa-heart').hover(function () {
      $(this).css('color', '#ff6666');
    }, function () {
      $(this).css('color', $colorElement);
    });

    $('.fa-flag').hover(function () {
      $(this).css('color', '#ff6666');
    }, function () {
      $(this).css('color', $colorElement);
    });

    $('.fa-twitter').hover(function () {
      $(this).css('color', '#ff6666');
    }, function () {
      $(this).css('color', $colorElement);
    });

    $('article').hover(function () {
      $(this).css('box-shadow', '5px 10px #888888');
    }, function () {
      $(this).removeClass('bord');
      $(this).css('box-shadow', '5px 10px #f4f1ec');
      $(this).addClass('bord');
    });
  };

  const createTweetElement = function (data) {
    const $tweet = $('<article>').addClass('tweet bord');
    const $header = $('<header>');
    const $avname = $('<div>')
      .addClass('avname');
    const $src = data.user.avatars;
    const $image = $('<img>').attr('src', $src);
    $avname.append($image)
      .append(data.user.name);
    const $handle = $('<div>')
      .text(data.user.handle)
      .addClass('handle');

    const $avnamehandle = $('<div>')
      .append($avname)
      .addClass('avnamehandle');
    $avnamehandle.append($handle);
    $header.text(data.content.text);
    $header.append($avnamehandle);

    const $footer = $('<footer>');
    const $timeago = timeago.format(`${data.created_at}`);
    const $dateago = $('<div>')
      .append($timeago)
      .addClass('dateago');

    const $ftAwesomeHeart = $('<i>').addClass('fas fa-heart');
    const $ftAwesomeFlag = $('<i>').addClass('fas fa-flag');
    const $ftAwesomeTwitterr = $('<i>').addClass('fab fa-twitter');

    const $fontawesome = $('<div>').addClass('fontawesome');
    $fontawesome.append($ftAwesomeHeart, $ftAwesomeFlag, $ftAwesomeTwitterr);
    $footer.append($dateago, $fontawesome);
    $tweet.append($header, $footer);
    return $tweet;
  };

  /**
   * $.ajax is asynchronous, we have to encapsulate all the code after
   * inside the call back to avoid having undefined variables
   */
  $('.error').hide();
  const BASE_URL = 'http://localhost:8080/tweets';
  $.ajax(BASE_URL, {
    user: 'user', content: 'content', created_at: 'created_at',
  })
    .done((dataTweets) => {
      data = dataTweets;
      renderTweets(data);
      manipulateDOM();
      $('form').submit(function (event) {
        event.preventDefault();
        const data = $(this).serialize();
        const tweetLength = $('#tweet-text').val().length;

        if (tweetLength > 140) {
          $('.long').show();
        } else if (tweetLength === 0) {
          $('.empty').show();
        } else {
          $('.error').hide();
          $.post('/tweets', data, () => {
            getTweets();
            $('#tweet-text').val('');
            $('.counter').text('140');
            renderTweets(data);
            manipulateDOM();
          });
        }
      });
    });
});
