$(document).ready(function() {
  // --- our code goes here ---
  //Count characters of tweet
  $('#tweet-text').on('input', function() {
   let maxChar = 140;
   console.log($(this).val())
   const inputData = $(this).val().length;
  
   const remainingChar = maxChar - inputData;
   const $counter = $('.formNewTweet').children('.submit').children('.counter');
  $counter.html(remainingChar); 
  // style remaining characters
  if(remainingChar < 0) {
    $counter.css('color', 'red');
  } else {
    $counter.css('color', 'black');
  }
  
    
})

});




// // function counter() {
// //   let total = 140
// //   let count = 0;
// //   count++;
// //   document.getElementsByClassName('counter').innerHTML = total - count;
// // }
// });
console.log('CONNECTED!!')