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
$('#quote_text').text( reviews[Math.floor(Math.random() * reviews.length)])
setInterval(function(){
$('#quote_text').text( reviews[Math.floor(Math.random() * reviews.length)])
// $('#quotes').fadeIn()

review_n++
}, 5000)
