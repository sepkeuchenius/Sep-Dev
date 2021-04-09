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

    for(var i =0; i<15; i++){
      var $tr = $('<tr>')
      for(var j=0; j<25; j++){
        var $td = $('<td>')
        $tr.append($td);
      }
      $("tbody").append($tr)

    }
  $('body').on('click', function(event){
    if(user && userDiagramData){
    saveCurrentDiagramLocally();
    saveCurrentDiagramFirebase();
  }
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
    elementInTheMake.find('.text').text($(this).val())
    rescale(elementInTheMake.find('text'));
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
    elementInTheEdit.find('.text').text($(this).val())
    rescale(elementInTheEdit.find('text'));
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
    if(e.keyCode == 13) {
        enter()
    }
    else if(e.keyCode == 16){
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
        'name': elementInTheEdit.find('.text').text(),
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
    var text = $('<p>').attr('class', 'text');
    text.text($('#name').val())
    // $newDiv.text()
    $newDiv.append(text);
    $newDiv.attr('id', idN++);
    $newDiv.css('background-color', colors[$('#colorpicker .selected').attr('id')]);
    currentCell.append($newDiv)
    elementInTheMake = $newDiv;
    blurAll([elementInTheMake]);
    rescale();
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
    $el.css('box-shadow', '0 0 20px #ddd');
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
      $('#lineType').trigger('change');
      $('.lineColor .selected').trigger('click');
      dialogOpen = true;
      $('#lineDialog').show( "slide");
      blurAll([lineInTheMake, percDivInTheMake]);
    }
    else{
      alert('Kan deze verbinding niet maken. Entiteiten moeten verschillen van hoogte.');
    }
  }
  function saveLineDialog(keep){

    if(!keep){
      lineInTheMake.remove();
      percDivInTheMake.remove();
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
    var fromId = fromEl.attr('id');
    var toId = toEl.attr('id');
    if(fromEl.offset().top < toEl.offset().top){
      id = fromEl.attr('id') + '-' + toEl.attr('id');
    }
    else{
      id = toEl.attr('id') + '-' + fromEl.attr('id');
    }
    return $(document).has($('#' + id)).length;
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
    elementInTheEdit.find('.text').text(editObject.name);
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
    $('#options').hide('slide');

    unBlur();
    dialogOpen = false;
  }
  function enter(){
    if(dialogOpen){
      deselect();
      closeDialog();
    }
    saveCurrentDiagramLocally();
    saveCurrentDiagramFirebase();
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
var items = data[1];
var info = data[0];
var scale = 1.5;

var fontSize = 10;
var itemWidth = 30; var itemHeight = 30;
var percWidth = 30;
var percHeigt = 15;
var percMargin = 3;
var margin = 100;

var rectWidth = 49.4;
var rectHeight = 45.9;
var rectLineWidth = 3;

var lineWidth = 1;
function makeDoc(){
  var data = getData();

  var info = data[0];
  var items = data[1];

  var tableWidth = info.width;
  var tableHeight = info.height;
  itemsArray = []
  for(var i in items){
      itemsArray.push(items[i])
  }
  var outerLeft =(Math.min(...itemsArray.map(function(item){return item.left;})) - margin)/scale;
  var outerRight =(Math.max(...itemsArray.map(function(item){return item.left;})) + itemWidth + margin)/scale;
  var outerTop = (Math.min(...itemsArray.map(function(item){return item.top;})) - margin)/scale;
  var outerBottom = (Math.max(...itemsArray.map(function(item){return item.top;})) + itemHeight + margin)/scale;


  var canvasWidth = outerRight - outerLeft;
  var canvasHeight = outerBottom - outerTop;

  var doc = new jsPDF("l","pt", [canvasWidth  , canvasHeight]);
  doc.setFontSize(fontSize);
  doc.setFillColor('#605d76')
  //fill blue background
  // doc.rect(0,0,canvasWidth*10, canvasHeight*10, 'F')
  doc.setLineWidth(1)
  var lines = data[2];


  var offsetx = 55 / scale / 2;
  var offsety = 55 / scale / 2;

  for(var i in lines){
    var line = lines[i]
    doc.setDrawColor(line.color)
    doc.setFillColor(line.color)

    if(line.type == 'zeggenschap'){
      doc.setLineDash([3,3])
    }
    else{
      doc.setLineDash([0,0])
    }
    doc.line(line['x1'] / scale - outerLeft, line['y1'] / scale - outerTop, line['x2'] / scale - outerLeft, line['y2'] / scale - outerTop);
    doc.roundedRect(line.partx / scale - outerLeft, line.party / scale - outerTop, percWidth / scale ,  percHeigt / scale,lineWidth,lineWidth, 'F')
    doc.setFontSize(fontSize / scale)
    doc.setTextColor('#ffffff')
    doc.text(line.partx / scale  + percMargin - outerLeft, line.party / scale + percMargin + 5 - outerTop, line.part)
  }
  for(var i in items){
    var item = items[i]
    var itemLeft = item.left/scale + offsetx - outerLeft;
    var itemTop = item.top/scale + offsety - outerTop;
    var docItem;
    doc.setFillColor(item.color);
    if(item.type == 'person'){
      //when its a person we need a circle
      docItem = doc.circle(itemLeft, itemTop, itemWidth / scale, 'F')
    }
    else{
      //when its a company we need a rectangle
      docItem = doc.roundedRect(itemLeft - offsetx, itemTop-offsety, rectWidth / scale, rectHeight / scale, rectLineWidth / scale, rectLineWidth / scale, 'F')
    }
    if(item.label.length >0){
      doc.setFontSize(item.fontsize * 1.2 / scale)
      doc.setTextColor('#000000');
      textItem = doc.text(itemLeft - offsetx/2 + (itemWidth/3), itemTop + itemHeight, item.label, {
        'maxWidth': (30*3)/scale,
        'align':'center',
      });
    }
  }
  if(info.title == ''){info.title ='Naamloze Diagram'}
  doc.save(info.title+'.pdf');

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
      'label': $(this).find('.text').text(),
      'fontsize': Number($(this).find('.text').css('font-size').replace('px', '')),
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
console.log(items)
return [info, items, lines]
}
function rescale(){
  $('.text').each(function(){
    var p = $(this);
    // var fontSize = Number(p.css('font-size').replace('px', ''));
    var charsperrule = [25,30,55,300];
    var fontsizes = [12,10,9,8];
    var height = p.height();
    var chars = p.text().length;
    for(var i in charsperrule){
      if(chars < charsperrule[i]){
        p.css('font-size', fontsizes[i]);
        break;
      }
    }



  })

}
function createSlides(){
  // 1. Create a new Presentation
  let pres = new PptxGenJS();

  // 2. Add a Slide
  let slide = pres.addSlide();


    // Define new layout for the Presentation

  // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
  scale =1;
  var data = getData();
  var info = data[0];
  var items = data[1];
  var lines = data[2];


  var tableWidth = info.width;
  var tableHeight = info.height;

  itemsArray = []
  for(var i in items){
      itemsArray.push(items[i])
  }
  var outerLeft =(Math.min(...itemsArray.map(function(item){return item.left;})) - margin)/scale;
  var outerRight =(Math.max(...itemsArray.map(function(item){return item.left;})) + itemWidth + margin)/scale;
  var outerTop = (Math.min(...itemsArray.map(function(item){return item.top;})) - margin)/scale;
  var outerBottom = (Math.max(...itemsArray.map(function(item){return item.top;})) + itemHeight + margin)/scale;


  var canvasWidth = outerRight - outerLeft;
  var canvasHeight = outerBottom - outerTop;

  var slidesWidth = 8;
  var slidesHeight = 8 * (canvasHeight/canvasWidth)
  pres.defineLayout({ name:'A3', width:slidesWidth, height:slidesHeight });

  // Set presentation to use new layout
  pres.layout = 'A3';


  var scaleWidth = canvasWidth/slidesWidth;
  var scaleHeight = canvasHeight/slidesHeight;


  var offsetx =0;
  var offsety = 0;
  var fontScale = (canvasWidth/tableWidth) * 5;

  for(var i in lines){
    var line = lines[i]
    var dash;
    console.log(line.type)
    if(line.type == 'zeggenschap'){
      dash = 'dash';
    }
    else{
      dash  = false;
    }
    var x1 = (line['x1'] / scaleWidth - outerLeft/scaleWidth)
    var x2 = (line['x2'] / scaleWidth - outerLeft/scaleWidth)
    var y1 = (line['y1'] / scaleHeight - outerTop/scaleHeight)
    var y2 = (line['y2'] / scaleHeight - outerTop/scaleHeight)
    var w = Math.abs(x2 - x1);
    var h = Math.abs(y2 - y1);
    var flipV = false;
    if(x1 > x2){
      flipV = true;
      x1 = x1 - w;
      x2 = x2 - w;
    }
    var percX = line.partx / scaleWidth - outerLeft/scaleWidth;
    var percY = line.party / scaleHeight - outerTop/scaleHeight;


    slide.addShape(pres.ShapeType.line, { line: { color: line.color, width: 1, dashType: dash }, x: x1, y: y1, w:w,  h:h, flipV: flipV});
    slide.addShape(pres.ShapeType.rect, { fill: { color: line.color, type: "solid" }, x: percX, y: percY, w:percWidth/scaleWidth,  h:percHeigt/scaleHeight });
    slide.addText(line.part ,{x: percX, y:percY, valign: 'middle', align:'center', w:(percWidth/scaleWidth) * 1, h:percHeigt/scaleHeight, fontSize: 12 / fontScale, margin:0});

    // doc.line();
    // doc.roundedRect(line.partx / scale - outerLeft, line.party / scale - outerTop, percWidth / scale ,  percHeigt / scale,lineWidth,lineWidth, 'F')
    // doc.setFontSize(fontSize / scale)
    // doc.setTextColor('#ffffff')
    // doc.text(line.partx / scale  + percMargin - outerLeft, line.party / scale + percMargin + 5 - outerTop, line.part)
  }

  for(var i in items){
    var item = items[i]
    var itemLeft = item.left/scaleWidth  - outerLeft / scaleWidth;
    var itemTop = item.top/scaleHeight  - outerTop / scaleHeight;
    console.log(itemLeft)
    console.log(itemTop)
    console.log(offsetx)
    console.log(offsety)
    if(item.type == 'person'){
      //when its a person we need a circle
      slide.addShape(pres.ShapeType.ellipse, { fill: { type: "solid", color: item.color }, x: itemLeft, y: itemTop, w: itemWidth / scaleWidth, h: itemHeight/scaleHeight });
    }
    else{
      //when its a company we need a rectangle
      slide.addShape(pres.ShapeType.rect, { fill: { type: "solid", color: item.color }, x: itemLeft, y: itemTop, w: itemWidth / scaleWidth, h: itemHeight/scaleHeight});
    }
    if(item.label.length >0){
      slide.addText(item.label ,{x: itemLeft - itemWidth/scaleHeight*0.25, y:itemTop + itemHeight/scaleHeight, valign: 'top', align:'center', w:(itemWidth/scaleWidth)*1.5, h: itemHeight/scaleHeight, fontSize: item.fontsize / fontScale, margin:0});
    }
  }

  if(info.title == ''){info.title ='Naamloze Diagram'}


  pres.writeFile(info.title);
  // 4. Save the Presentation
}
function download(){
  if($('#download-type').val() == 'pdf'){
    makeDoc();
  }
  else{
    createSlides();
  }
}
