var reviews = [
  "Second time hiring Jozef. This time the project was a little trickier, but he was able to get it done. Definitely recommend Jozef!",
  "This was the second time I worked with Josep. He is an absolute genius and I will definitely be working with him again in the future. Thanks for all your help!",
  "Jozef did a fantastic job writing a Google Apps script for us. Our script required parsing of email, converting an attachment into a GSheet, and modifying the data. Jozef communicated well and delivered exactly as per the scope of the project. Glad to have found him and will hire him again if we have a similar type of project.",
  "Jozef is a complete Genius. He connected two forms by creating a script between a google survey to a google sheet. The input of the survey goes into the sheet and an output is sent to the person’s email. He totally had this idea and Conley on his own. I had Originally wanted an editable pdf, but that was not going to work due to my complex formulas in the doc. Jozef came up with the idea and executed it brilliantly. I will definitely ask him for more jobs in the future. He is a complete genius!",
  "Great communication, friendly professional. Great quality of the final product! Will hire again.",
  "GREAT GREAT GREAT work!!!! 2nd time I hired him and will most likely come back for more :)",
  "Everything was completed very quickly! Thank you for your help.",
  "VERY CAPABLE!!! Exceptional work and knew exactly what I wanted and actually made it better :)",
  "Excellent work, very fast, good communication. My project was a bit complicated but Jozef completed it flawlessly. Highly recommended.",
  "Jozef is very knowledgeable and produced great work. Would recommend his services. I already told him i'll be using him again.",
  "Jozef has great communication skills and an outstanding ability to understand requirements. His work was completed with great quality, on time and on budget. He was proactive as it relates to finding issues and clarifying requirements. This project included work with Google Apps Script and Gmail and can be considered as a medium complexity project. I would highly recommend Jozef for any project with similar scope and technology underlining.",
  "Great job! completed the job very quickly and correctly, highly recommend!",
  "Successful project! The freelancer delivered an excellent script evaluating some symbolic math expressions."
]
var review_n = 0;
updateText()
var qw = $('#quotes').width()

function updateText(){
  
  var text = reviews[Math.floor(Math.random() * reviews.length)];
  $('#quote_text').text(text)
  $('#quotebar').width(0)
  var total = text.length * 30
  
  var x = 0;
  var perc = 0;
  var w = 0;
  var i = window.setInterval(function(){
    x+=10
    perc = x / total
    w = perc * qw
    // console.log(w)
    $('#quotebar').width(w)
  }, 10)
  window.setTimeout(function(){
    window.clearInterval(i);
    updateText()
  }, total)
}

$('#form_msg').val(' I would like a Google Forms, which asks clients for their measurements. Those measurements should be sent to Google Sheets where they are calculated and stored. Then a Google Doc should be formed automatically, in my style, with their results and their measurements. That document should be downloaded as pdf then, and sent to their email-address, which they entered in the form.')

window.onscroll = function() {
  if (window.pageYOffset > 70) {
    $('#footer').css('display', 'table');
  } else {
    $('#footer').css('display', 'none');
  }
};

function mail(){
  window.open('mailto:sep@sep.dev', '_blank');
}
function learnMore(){
  document.getElementById('script').scrollIntoView()
}

$(document).ready(function(){
    //** notice we are including jquery and the color plugin at
    //** http://code.jquery.com/color/jquery.color-2.1.0.js
    
    var scroll_pos = 0;
    var animation_begin_pos = 0; //where you want the animation to begin
    var animation_end_pos = $(document).height(); //where you want the animation to stop
    var beginning_color = new $.Color( 'rgb(255,255,255)' ); //we can set this here, but it'd probably be better to get it from the CSS; for the example we're setting it here.
    var ending_color = new $.Color( 'rgb(76,167,34)' ); ;//what color we want to use in the end
    $(document).scroll(function() {
        scroll_pos = $(this).scrollTop();
        if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos ) {
           // console.log( 'scrolling and animating' );
            //we want to calculate the relevant transitional rgb value
            var percentScrolled = scroll_pos / ( animation_end_pos - animation_begin_pos );
            var opacity = 0.20 / (100 * percentScrolled);
            var newRed = beginning_color.red() + ( ( ending_color.red() - beginning_color.red() ) * percentScrolled );
            var newGreen = beginning_color.green() + ( ( ending_color.green() - beginning_color.green() ) * percentScrolled );
            var newBlue = beginning_color.blue() + ( ( ending_color.blue() - beginning_color.blue() ) * percentScrolled );
            var newColor = new $.Color( newRed, newGreen, newBlue );
            //console.log( newColor.red(), newColor.green(), newColor.blue() );
            $('#background').css('opacity', Math.min(0.2, Math.max(0, opacity)))
             $('#background_mobile').css('opacity', Math.min(0.2, Math.max(0, opacity)))
            $('body').animate({ backgroundColor: newColor }, 0);
        } else if ( scroll_pos > animation_end_pos ) {
             $('body').animate({ backgroundColor: ending_color }, 0);
        } else if ( scroll_pos < animation_begin_pos ) {
             $('body').animate({ backgroundColor: beginning_color }, 0);
        } else { }
    });
});

function send(){
  
  text = 'Hi there! \n' + $('#form_msg').val()
  window.open('mailto:sep@sep.dev?subject=I would love to automate this&body='+text)
  
  
}