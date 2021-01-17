$('#title').fadeIn(500, function(){$('#content').fadeIn()})
var icon_links = {
  'outlook': 'app_icons/outlook.svg',
  'onedrive': 'app_icons/onedrive.svg',
  'sharepoint': 'app_icons/sharepoint.svg',
  'hubspot': 'app_icons/hubspot.svg',

}
var icons = ['microsoft','outlook', 'sharepoint', 'onedrive', 'zapier','appsscript','hubspot', 'drive', 'g_forms', 'gmail','docs', 'sheets', 'slides', 'keep']
var samples = [
  {
    'quote': "Neem van elke inkomende mail de bijlagen, en upload ze naar de map van de juiste, bijhorende klant",
    'icons': ['outlook', 'sharepoint', 'onedrive', 'hubspot']
  },
  {
    'quote': 'Als een formulier wordt verzonden, mail de respondent een bestand met zijn doorberekende resultaten',
    'icons': ['drive', 'g_forms', 'gmail']
  }

]
window.onscroll = function() {
  if (window.pageYOffset > 80) {
    $('#header_logo').fadeIn()
  } else {
    $('#header_logo').fadeOut()
  }
  if( window.pageYOffset > $('#sub').offset().top){
    $("#header").css('background', 'rgb(250,255,250,0.8)')
  }
  else{
    $("#header").css('background', 'transparent')
  }
};

$(document).ready(function(){
  dots = {}
  backgroundIteration()
  makeSamples();
  // window.setInterval(backgroundIteration, 5000);
})
var current = 0;
function makeSamples(){
  for(current in samples){
    var sample = samples[current];
    var quote = sample.quote;
      var samplebox = $('.samplebox').first().clone();
    samplebox.find(".text").first().text('"'+ quote+ '"');
    samplebox.find('.icons').first().empty()

    samplebox.attr('id', '')
    // $('#samples').append(samplebox)
  }
  var sample_icons = icons;
  var sample_icons_links = sample_icons.map(function(icon){return 'app_icons/'+icon+'.svg'});
  sample_icons_links.forEach(function(link){
    var icon_div = $("<img>")
    icon_div.attr('src', link);
    icon_div.attr('class', 'icon')
    $('#icons').append(icon_div)
  })


}
// window.setInterval(createBackground, 1000)



function backgroundIteration(){
  for(var i=0;i<yd;i++){
    for(var j=0;j<xd;j++){
      drawDot(i,j);
    }
  }
  window.setTimeout(function(){
    drawLine();
    drawLine();
    drawLine();
    drawLine();
    drawLine();
    drawLine();
    drawLine();
  },3000)
}
var dots = {}
var xd = 6;
var yd = 5;
var increaseSize = 2;

function drawDot(i,j){
    var dot = $('<div>');
    dot.addClass('dot');
    var img = $('<img>')
    var link = icon_links[Object.keys(icon_links)[Math.floor(Math.random() * Object.keys(icon_links).length)]];
    img.attr('src', link)

    var back = $('#background');
    var w = back.width()/xd;
    var h = back.height()/6;

    var x = w * j + (0 + 0.8 * Math.random()) * w
    var y = h * i + (0 + 0.5 * Math.random()) * h

    // dot.append(img)

    dot.css('left',x)
    dot.css('top',y)
    dot.width(24 + 10 * Math.random())
    dot.height(dot.width())
    dot.hide();
    back.append(dot)
    var wait = Math.random() * 3000;
    var fade = 1500 + Math.random() * 500
    window.setTimeout(function(){dot.fadeIn(fade)}, wait);
    if(!dots[i]){
      dots[i] = {};
    }
    dots[i][j] = dot;
}
function drawLine(){
  var x = Math.floor(Math.random() * xd);
  var y = Math.floor(Math.random() * yd);
  if(!dots[y] || !dots[y][x]){drawLine(); return;}
  var dot1 = dots[y][x];
  x = Math.floor(Math.random() * xd);
  y = Math.floor(Math.random() * yd);
  if(!dots[y] || !dots[y][x]){drawLine(); return;}
  var dot2 = dots[y][x];
  if(dot1 == dot2){drawLine(); return;}

  var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
  // newLine.setAttribute('id','line' + fromId + '-' + toId);

  newLine.setAttribute('x1',dot1.position().left + dot1.width() / 2);
  newLine.setAttribute('x2',dot1.position().left + dot1.height() / 2);
  newLine.setAttribute('y1',dot1.position().top + dot1.width() / 2);
  newLine.setAttribute('y2',dot1.position().top + dot1.width() / 2);


  // newLine.setAttribute('id', id)
  $(newLine).hide();
  $(newLine).attr('stroke-dasharray', [5,5])
  $("#svg").append(newLine);
  $(newLine).fadeIn(1000,function(){approach(newLine, dot1, dot2, 0)})

}
function approach(newLine, dot1, dot2, ratio){
    if(ratio > 1){
      drawLine();
      return;
    }
    var x2 = (1 - ratio) * (dot1.position().left + dot1.width()/2) + ratio * (dot2.position().left + dot2.width()/2)
    var y2 = (1 - ratio) * (dot1.position().top + dot1.height()/2) + ratio * (dot2.position().top + dot2.height()/2)
    newLine.setAttribute('x2',x2);
    newLine.setAttribute('y2',y2);
    ratio += 0.001
    window.setTimeout(function(){approach(newLine, dot1, dot2, ratio)}, Math.random() * 15 + 15)
}
