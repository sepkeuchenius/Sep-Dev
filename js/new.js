$('#title').fadeIn(500, function(){$('#content').fadeIn()})
var icon_links = {
  'outlook': 'app_icons/outlook.svg',
  'onedrive': 'app_icons/onedrive.svg',
  'sharepoint': 'app_icons/sharepoint.svg',
  'hubspot': 'app_icons/hubspot.svg',

}
var terms = ['tijdrovende', 'dure', 'achterstallige', 'vervelende', 'onmenselijke', 'onhandige']
var icons = ['microsoft','outlook', 'sharepoint', 'onedrive', 'zapier','appsscript','hubspot', 'drive', 'g_forms', 'gmail','docs', 'sheets', 'slides', 'keep', 'insta', 'fb', 'linkedin', 'twitter']
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
    $("#header").addClass('scrolledDown')
    // $("#header").css('background', 'rgb(250,255,250,0.8)')
  }
  else{
    $("#header").removeClass('scrolledDown')
  }
};

$(document).ready(function(){
  dots = {}
  if($(document).width() <= 700){
    xd = 3;
    yd = 5;
    var totalDots = xd * yd
    switchTitelPic()

  }
  backgroundIteration()
  makeSamples();
  changeTerm();
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
    // $('#icons').append(icon_div)
  })


}
// window.setInterval(createBackground, 1000)
var termN = 1
function changeTerm(){
  var term = $('#term')
  var current = $('#term').text();
  var l = current.length;
  window.setTimeout( function(){removeTerm(l, current, term);}, 3000)
}
function removeTerm(l, current, term){
  if(l<0){
    var newTerm = terms[termN];
    addTerm(newTerm, 0)
    return;
  }
  else{
    term.text(current.substring(0,l));
    l--
    window.setTimeout(function(){removeTerm(l, current, term)}, 10 + Math.random() * 100)
  }
}
function addTerm(newTerm, x){
  var term = $('#term');
  if(x > newTerm.length){
    termN++;
    termN%=terms.length;
    changeTerm();
    return;
  }
  term.text(newTerm.substring(0,x));
  x++
  window.setTimeout(function(){addTerm(newTerm, x)}, 50 + Math.random() * 100)
}
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
    drawLine();
    drawLine();
    drawLine();
  },3000)
}
var dots = {}
var xd = 6;
var yd = 5;
var totalDots = xd * yd
var totalIcons = icons.length;
var increaseSize = 2;
var used_icons;
var drawnLinks = [];

function drawDot(i,j){
    if((((i==1 || i==2 ||i==3) && (j==2 ||j ==3)) && $(document).width() > 700)|| ( $(document).width() <= 700 && i == 1 && j == 1)){return;}
    var dot = $('<div>');
    dot.addClass('dot');
    var img = $('<img>');
    var isIcon = Math.random() < totalIcons / totalDots;
    if(isIcon){
      var iconN = Math.floor(Math.random() * icons.length)
      var icon = icons[iconN];
      icons.splice(iconN, 1)
      if(icon){
      var link = 'app_icons/' + icon + '.svg'
      dot.append(img)
      img.attr('src', link)
      img.height(24)
      img.css('opacity', 0.3)
      if($(document).width() <= 700){
        img.css('opacity', 0.5)
      }
      dot.css('background', 'transparent')
    }
    }

    var back = $('#background');
    var w = back.width()/xd;
    var h = back.height()/6;
    if($(document).width() <= 700){
      h = back.height()/yd
    }

    var x = w * j + (0.2 + 0.5 * Math.random()) * w
    var y = h * i + (0.2 + 0.3 * Math.random()) * h


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
  x = x + Math.floor(Math.random() * 2.5);
  y =y  + Math.floor(Math.random() * 2.5);
  if(!dots[y] || !dots[y][x]){drawLine(); return;}
  var dot2 = dots[y][x];
  if(dot1 == dot2 || drawnLinks.indexOf([dot1, dot2]) != -1){drawLine(); return;}
  drawnLinks.push([dot1,dot2])
  // if(checkCollision(dot1, dot2)){drawLine(); return;}


  var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
  // newLine.setAttribute('id','line' + fromId + '-' + toId);

  newLine.setAttribute('x1',dot1.position().left + dot1.width() / 2);
  newLine.setAttribute('x2',dot1.position().left + dot1.height() / 2);
  newLine.setAttribute('y1',dot1.position().top + dot1.width() / 2);
  newLine.setAttribute('y2',dot1.position().top + dot1.width() / 2);


  // newLine.setAttribute('id', id)
  $(newLine).hide();
  $(newLine).attr('stroke-dasharray', [3,3])
  $("#svg").append(newLine);
  $(newLine).fadeIn(1000,function(){approach(newLine, dot1, dot2, 0)})
  window.setTimeout(function(){
    drawnLinks.splice(drawnLinks.indexOf([dot1,dot2]), 1)
    $(newLine).fadeOut(3000)}, 20000)

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


    ratio += 0.010
    window.setTimeout(function(){approach(newLine, dot1, dot2, ratio)},  15)
}
function bnw(){
    $('#bnw').hide('slide',{
      direction: 'up'
    }, 500, function(){
    $('#bnw').text(bnws[current])
    current += 1;
    current %= bnws.length});
    $('#bnw').show('slide', {'direction': 'down'})

}

function backgroundmaker(){
  var dot = $('<div>');
}
function checkCollision(dot1, dot2){
  var x1 = dot1.offset().left;
  var y1 = dot1.offset().top;

  var x2 = dot2.offset().left;
  var y2 = dot2.offset().top;



  var slope = (y2 - y1) / (x2 - x1);



  var start = 0;




  for(i in dots){
    for(var j in dots[i]){
      var dot = dots[i][j];
      var x = dot.offset().left;
      var y = dot.offset().top;
      var w = dot.width();
      var h = dot.height();

      var iets = x - x1;

      if(Math.abs((iets * slope + start) - y) < 10){return true;}
  }}
  return false;


}
function switchTitelPic(){
  $('.section h1').each(function(){
    $(this).after($(this).prev())
  })
}
