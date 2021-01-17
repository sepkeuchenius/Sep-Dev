$('#title').fadeIn(500, function(){$('#content').fadeIn()})
var icon_links = {
  'outlook': 'app_icons/outlook.svg',
  'onedrive': 'app_icons/onedrive.svg',
  'sharepoint': 'app_icons/sharepoint.svg',
  'hubspot': 'app_icons/hubspot.svg',

}
var bnws = ['tijdrovende', 'dure', 'vervelende', 'onmogelijke', 'veel', 'achterstallige']
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

$(document).ready(function(){
  changeSample();
  window.setInterval(bnw, 5000);
})
var current = 0;
function changeSample(){
  for(current in samples){
    var sample = samples[current];
    var quote = sample.quote;
    var sample_icons = sample.icons;
    var sample_icons_links = sample_icons.map(function(icon){return 'app_icons/'+icon+'.svg'});
    var samplebox = $('.samplebox').first().clone();
    samplebox.find(".text").first().text('"'+quote+'"');
    samplebox.find('.icons').first().empty()
    sample_icons_links.forEach(function(link){
      var icon_div = $("<img>")
      icon_div.attr('src', link);
      icon_div.attr('class', 'icon')
      samplebox.find('.icons').first().append(icon_div)
      samplebox.attr('id', '')
    })
    $('#samples').append(samplebox)
  }
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
