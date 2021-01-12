  var elementInTheMake;
  var lineInTheMake;
  var percDivInTheMake;
  var elementInTheEdit;
  var editObject = {};
  var dialogOpen = false;
  var lineInTheEdit;
  var percDivInTheEdit;
  var editLineObject;
  var editPercDivObject;
  var menuOpen;
  var justOpened

  var settings = {
    'cellwidth': 100,
    'cellheight': 100,
    'vspacing': 30,
    'hspacing': 30,
    'linespacing': {
      'eigendom': -2,
      'zeggenschap':2
    },
    'vlinespacing': {
      'eigendom': 0.6,
      'zeggenschap':0.4
    },
  }

  var colors = {
    'wit': '#ffffff',
    'groen': '#9edb9e',
    'geel': '#dbdc84',
    'oranje': '#e28a50',
    'rood': '#e25050',
    'paars': '#b450e2',
    'blauw': '#5097e2',
    'zwart': '#252b32'
  }

  var lineTypes = {
    'eigendom': '0,0',
    'zeggenschap' :'5,5'
  }

  var data = {};


  $(document).ready(makeDocument)

  function makeDocument(){
    var tableHeight = ($(document).height()) / settings.cellheight;
    var tableWidth = ($(document).width()) / settings.cellwidth;
    console.log(tableHeight)

    for(var i =0; i<15; i++){
      var $tr = $('<tr>')
      for(var j=0; j<25; j++){
        var $td = $('<td>')
        $tr.append($td);
      }
      $("tbody").append($tr)

    }
  $('body').on('click', function(event){
    var targetId = $(event.target).attr('id');
    if(menuOpen && ['options', 'menubutton'].indexOf(targetId) == -1 && !$(event.target).is('section')){
      $('#options').hide('slide')
      dialogOpen = false;
      menuOpen = false;
    }
  })
  $('#menubutton').on('click', function(){
    $('#options').show('slide')
    dialogOpen = true;
    menuOpen = true;
    justOpened = true;
  })

  $('td').on('click', newCell)
  $('#name').on('input', function(){
    elementInTheMake.text($(this).val())
  })
  $('#type').on('change', function(){
    elementInTheMake.attr('class', $(this).val())
  })

  $(".color").on('click', function(){
    $(".color").removeClass('selected');
    $(this).addClass('selected')
    elementInTheMake.css('background', colors[$(this).attr('id')])

  })
  $('.editColor').on('click', function(){
    $(".editColor").removeClass('selected');
    $(this).addClass('selected')
    elementInTheEdit.css('background', colors[$(this).attr('id')])
  })

  $('.lineColor').on('click', function(){
    $('.lineColor').removeClass('selected')
    $(this).addClass('selected')
    buildLine();
  })
  $('#lineType').on('change', function(){
    buildLine()
  })
  $('#editName').on('input', function(){
    elementInTheEdit.text($(this).val())
  })
  $('#editType').on('change', function(){
    elementInTheEdit.attr('class', $(this).val())
  })
  $('#part').on('input', function(){
    buildLine()
  })
  $('.editLineColor').on('click', function(){
    $('.editLineColor').removeClass('selected')
    $(this).addClass('selected')
    buildLine(true);
  })
  $('#editPart').on('input', function(){
    buildLine(true);
  })
  $('#editLineType').on('change', function(){
    buildLine(true)
  })


  $(document).on('keypress',function(e) {
    console.log(e)
    if(e.keyCode == 13) {
        enter()
    }
    else if(e.keyCode == 16){
      console.log('tst')
      shift()
    }
  });
  $('.color').each(function(){
    $(this).css('background', colors[$(this).attr('id')]);
  })
  $('.editColor').each(function(){
    $(this).css('background', colors[$(this).attr('id')]);
  })
  $('.lineColor').each(function(){
    $(this).css('background', colors[$(this).attr('id')]);
  })
  $('.editLineColor').each(function(){
    $(this).css('background', colors[$(this).attr('id')]);
  })
  }
  var currentCell;
  function newCell(event){
    console.log(event)
    if(dialogOpen && !event.shiftKey){
      return
    }
    else if(dialogOpen && event.shiftKey && $(this).has('div').length){
      mouseAndShift($(this).find('div').first())
      return;
    }
    if($(this).has('div').length){
      click($(this).find('div').first())
      return
    }
    currentCell = $(this)
    newDialog();
  }
  var fromEl;
  var toEl;
  var open = false;

  function click($el){
    if(open){
      toEl = $el;
      if(toEl.attr('id') != fromEl.attr('id')){
        newLineDialog();
      }
      open = false;
      deselect()
    }
    else{
      fromEl = $el
      select($el)
      open = true
      elementInTheEdit = fromEl;
      editObject = {
        'name': elementInTheEdit.text(),
        'type': elementInTheEdit.attr('class'),
        'background': rgbToHex(elementInTheEdit.css('background-color'))
      }
      newEditDialog();
    }
  }

  function connect(){
    var fromX = fromEl.offset().left
    var fromY = fromEl.offset().top;


    var toX = toEl.offset().left;
    var toY = toEl.offset().top;
    if(Math.abs(fromY - toY) < 20){return false}
    else if(fromY < toY){
      id = fromEl.attr('id') + '-' + toEl.attr('id')+'-'+ $('#lineType').val();
    }
    else{
      id = toEl.attr('id') + '-' + fromEl.attr('id')+'-'+ $('#lineType').val();;
      var temp = [fromEl, fromX, fromY];
      fromEl = toEl;
      fromX = toX;
      fromY = toY;
      toEl = temp[0];
      toX = temp[1];
      toY = temp[2];
    }



    var x1 = fromX + 0.5 * fromEl.outerWidth();
    var y1 = fromY + 0.5 * fromEl.outerHeight();

    var x2 = toX + 0.5 * toEl.outerWidth();
    var y2 = toY + 0.5 * toEl.outerHeight()

    x1 += settings['linespacing'][$('#lineType').val()]
    x2 += settings['linespacing'][$('#lineType').val()]

  	//get connections from fromel
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    // newLine.setAttribute('id','line' + fromId + '-' + toId);
    newLine.setAttribute('x1',x1);
    newLine.setAttribute('y1',y1);
    newLine.setAttribute('x2',x2);
    newLine.setAttribute('y2',y2);



    newLine.setAttribute('id', id)
    $("#map").append(newLine);

    $percDiv = $('<div>');
    if(Number($('#part').val()) || $('#part').val() == "0"){
      text = $('#part').val() + '%'
    }
    else{
      text = '100%'
    }
    $percDiv.text(text);
    $percDiv.attr('class', 'part');

    var f = Number(settings['vlinespacing'][$('#lineType').val()]);


    $percDiv.css('left', (x1 * f + x2 * (1-f))  - 15)
    $percDiv.css('top', (y1 * f + y2 * (1-f)) - 5);

    $percDiv.attr('id', id + '-part')
    $percDiv.on('click', editLine)
    $('#canvas').append($percDiv)
    lineInTheMake = $(newLine);
    percDivInTheMake = $percDiv;
    return true;
  }



  function newDialog(){
    dialogOpen = true;
    $('#dialog').show( "slide");
    $('#name').focus();
    $newDiv = $('<div>')
    $newDiv.attr('class', $('#type').val())
    console.log($('#type').val())
    // $newDiv.text($('#name').val())
    var textPart = $('<div>')
    textPart.attr('class', 'text')
    var par = $('<p>')
    textPart.append(par);
    par.text($('#name').val())
    $newDiv.append(textPart);
    $newDiv.attr('id', idN++);
    console.log($('#colorpicker .selected').attr('id'))
    $newDiv.css('background-color', colors[$('#colorpicker .selected').attr('id')]);
    console.log($newDiv.css('background'))
    currentCell.append($newDiv)
    elementInTheMake = $newDiv;
    blurAll([elementInTheMake])
  }
  function newEditDialog(){
    dialogOpen = true;
    $('#editName').val(editObject.name)
    $('#editName').focus();
    $('#editType').val(editObject.type)
    var colorName;
    for(var color in colors){
      if(colors[color] == editObject.background){
        colorName = color;
      }
    }
    $('.editColor').removeClass('selected')
    $('#editColorpicker #' +colorName).addClass('selected')

    close();

    //blur background
    blurAll([elementInTheEdit]);
    $("#editDialog").show('slide');

  }
  function select($el){
    $('td div').css('box-shadow', 'none');
    $el.css('box-shadow', '0 0 20px #ddd')
  }
  function deselect(){
    $('td div').css('box-shadow', 'none');
  }
  function close(){
    open = false;
    fromEl = false;
  }
  function newLineDialog(){
    if(connect()){
      $('#lineType').trigger('change')
      $('.lineColor .selected').trigger('click')
      dialogOpen = true;
      $('#lineDialog').show( "slide");
      blurAll([lineInTheMake, percDivInTheMake])
    }
    else{
      alert('Kan deze verbinding niet maken. Entiteiten moeten verschillen van hoogte.');
    }
  }
  function saveLineDialog(keep){

    if(!keep){
      lineInTheMake.remove()
      percDivInTheMake.remove()
    }
     var found = 0;
    $('line').each(function(){
      if($(this).attr('id') == lineInTheMake.attr('id')){found++}
    })
    if(found > 1){
      alert('Deze verbinding is al gemaakt');
      return;
    }
    closeDialog();

  }
  var idN = 0;
  function saveDialog(keep){
    if(!keep){
      elementInTheMake.remove();
    }
    closeDialog();

  }
  function isConnected(fromEl, toEl){
    //needs change (type of line)
    var fromId = fromEl.attr('id')
    var toId = toEl.attr('id')
    if(fromEl.offset().top < toEl.offset().top){
      id = fromEl.attr('id') + '-' + toEl.attr('id');
    }
    else{
      id = toEl.attr('id') + '-' + fromEl.attr('id');
    }
    console.log(id)
    return $(document).has($('#' + id)).length
  }

  function saveEditDialog(keep){
    deselect();
    if(!keep){
      if(confirm('Weet u het zeker?')){
        elementInTheEdit.remove();
      }
    }
    closeDialog();
  }
  function cancelEditDialog(){
    closeDialog();
    deselect()
    elementInTheEdit.text(editObject.name);
    elementInTheEdit.attr('class', editObject.type);
    elementInTheEdit.css('background-color', editObject.background);
  }
  function makeConnection(){
    open = true;
    fromEl = elementInTheEdit;
    closeDialog();
  }

  function rgbToHex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
  function setLinePositions(id){
    var split = id.split('-');
    var fEl = $('#' + split[0]);
    var tEl = $('#' + split[1]);

    var type = split[2]

    var fromX = fEl.offset().left
    var fromY = fEl.offset().top;

    var toX = tEl.offset().left;
    var toY = tEl.offset().top;

    var x1 = fromX + 0.5 * fEl.outerWidth();
    var y1 = fromY + 0.5 * fEl.outerHeight();

    var x2 = toX + 0.5 * tEl.outerWidth();
    var y2 = toY + 0.5 * tEl.outerHeight()

    x1 += settings['linespacing'][type]
    x2 += settings['linespacing'][type]

    $("#" + id).attr('x1', x1)
    $("#" + id).attr('x2', x2)
    $("#" + id).attr('y1', y1)
    $("#" + id).attr('y2', y2)

    var f = Number(settings['vlinespacing'][type]);


    $('#' + id + '-part').css('left', (x1* f + x2 * (1-f)) - 15)
    $('#' + id + '-part').css('top', (y1 * f + y2 * (1-f))- 5);


  }
  function editLine(){
    if(dialogOpen){return}
    percDivInTheEdit = $(this);
    var lineId = $(this).attr('id').replace('-part', '');
    lineInTheEdit = $('#' + lineId);
    var type = lineId.split('-')[2]
    dialogOpen = true;
    $('#editLineDialog').show('slide');
    $('#editPart').val($(this).text().replace('%', ''))
    $('.editLineColor').removeClass('selected');
    $('#editLineType').val(type)

    var hex = rgbToHex($(this).css('background-color'));
    console.log(hex)
    var colorName;
    for(var color in colors){
      if(colors[color] == hex){
        colorName =color
      }
    }

    editLineObject = {
      'stroke': colorName,
      'part': $("#editPart").val(),
      'type': type
    }

    $('#editLineColorpicker #' + colorName).addClass('selected')
    blurAll([lineInTheEdit, percDivInTheEdit])

  }
  function saveEditLineDialog(keep){
    if(!keep){
      if(confirm('Weet je het zeker?')){
        lineInTheEdit.remove();
        percDivInTheEdit.remove();
      }
      else{
        return;
      }
    }
    deselect();
    closeDialog();

  }

  function cancelEditLineDialog(){
    changeLine(lineInTheEdit, percDivInTheEdit, editLineObject);
    deselect();
    closeDialog();
  }


  function changeLine(line, part, changes){
    line.css('stroke', colors[changes.stroke]);
    part.css('background-color', colors[changes.stroke]);
    part.text(changes.part + '%');
    line.attr('stroke-dasharray', lineTypes[changes.type])
    var oldId = line.attr('id');
    var oldIdSplit = oldId.split('-');
    oldIdSplit[2] = changes.type;
    var newId = oldIdSplit.join('-');
    line.attr('id', newId)
    part.attr('id', newId +'-part')
    setLinePositions(newId)
  }
  function buildLine(edit){
    if(edit){
      var changes = {
        'stroke':$('#editLineColorpicker .selected').attr('id'),
        'type': $('#editLineType').val(),
        'part': $('#editPart').val()
      }
      changeLine(lineInTheEdit, percDivInTheEdit, changes);
    }
    else{
     var changes = {
        'stroke': $('#lineColorpicker .selected').attr('id'),
        'type': $('#lineType').val(),
        'part': $('#part').val()
      }
      changeLine(lineInTheMake, percDivInTheMake, changes);
    }
  }

  function closeDialog(){
    $('#dialog').hide('slide');
    $('#lineDialog').hide('slide');
    $('#editDialog').hide('slide');
    $('#editLineDialog').hide('slide');

    unBlur();
    dialogOpen = false;
  }
  function enter(){
    if(dialogOpen){
      deselect();
      closeDialog();
    }
  }

  function mouseAndShift($el){
    if(dialogOpen && $('#editDialog').css('display') != 'none'){
      closeDialog();
      deselect();
      fromEl = elementInTheEdit;
      toEl = $el;
      if(toEl.attr('id') != fromEl.attr('id')){
        newLineDialog();
      }
      open = false;
      deselect()
    }
  }

  function CreatePDFfromHTML() {
    var doc = new jsPDF();
var elementHTML = $('#totalDiagram').html();
var specialElementHandlers = {
    '#elementH': function (element, renderer) {
        return true;
    }
};
doc.fromHTML(elementHTML, 15, 15, {
    'width': 170,
    'elementHandlers': specialElementHandlers
});

// Save the PDF
doc.save('sample-document.pdf');

}
function blurAll(exceptThese){
  $('td div').css('filter', 'blur(2px)');
  $('.part').css('filter', 'blur(2px)');
  $('line').css('filter', 'blur(2px)');

  for(var x in exceptThese){
    exceptThese[x].css('filter', 'none')

  }
}
function unBlur(){
  $('td div').css('filter', 'none');
  $('line').css('filter', 'none');
  $('.part').css('filter', 'none');

}
function makeDoc(){
  var data = getData();
  var items = data[1];
  var info = data[0];
  var scale = 2

  console.log(info.width, info.height)
  var doc = new jsPDF("l","pt", [info.width / scale , info.height / scale]);
  doc.setFillColor('#605d76')
  doc.rect(0,0,info.width / scale , info.height / scale, 'F')
    doc.setLineWidth(1)
  var lines = data[2];
  console.log(items)
  for(var i in lines){
    var line = lines[i]
    doc.setDrawColor(line.color)
    doc.setFillColor(line.color)
    var offsetx = 55 / scale / 2
    var offsety = 55 / scale / 2
    if(line.type == 'zeggenschap'){
      doc.setLineDash([3,3])
    }
    else{
      doc.setLineDash([0,0])
    }
    doc.line(line['x1'] / scale, line['y1'] / scale, line['x2'] / scale , line['y2'] / scale)
    doc.roundedRect(line.partx / scale, line.party / scale, 30 / scale ,  15 / scale,1,1, 'F')
    doc.setFontSize(12 / scale)
    doc.setTextColor(1,1,1)
    doc.text(line.partx / scale, line.party / scale + 6, line.part)
  }
  for(var i in items){
    var item = items[i]
    var docItem;
    doc.setFillColor(item.color);
    if(item.type == 'person'){
      docItem = doc.circle(item.left  / scale + offsetx, item.top / scale + offsety, 33.75 / scale, 'F')
    }
    else{
      docItem = doc.roundedRect(item.left / scale, item.top/ scale, 49.4 / scale, 45.9 / scale, 3 / scale, 3 / scale, 'F')
    }
  }
  if(info.title == ''){info.title ='Naamloze Diagram'}
  doc.save(info.title+'.pdf')

}
function getData(){
  var items = {}
  var lines = {}
  var info = {
    'title': $('#title').val(),
    'width': $('table').width(),
    'height': $('table').height(),
  }
  $('td div').each(function(){
    items[$(this).attr('id')] = {
      'left': $(this).offset().left,
      'top': $(this).offset().top,
      'color': rgbToHex($(this).css('background-color')),
      'label': $(this).text(),
      'type': $(this).attr('class')
    }
  })

  $('line').each(function(){
    var id = $(this).attr('id');
    var split = id.split('-');
    var partId = id + '-part';
    var part = $("#" + partId);
    lines[$(this).attr('id')] = {
      'x1' : $(this).attr('x1'),
      'y1' : $(this).attr('y1'),
      'x2' : $(this).attr('x2'),
      'y2' : $(this).attr('y2'),
      'color': rgbToHex(part.css('background-color')),
      'part': part.text(),
      'type': split[2],
      'partx': part.offset().left,
      'party': part.offset().top
    }
  })

return [info, items, lines]

}
