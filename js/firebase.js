// Initialize the FirebaseUI Widget using Firebase.
var user;
var db;
var userDiagrams;
var userDiagramData;
var currentDiagramId;
$(document).ready(function(){
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        console.log('logged in, loading data')
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        $('#application-wrapper').show();
        user = authResult.user;
        loadDiagrams();
        
        return false;

      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      {provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        fullLabel: 'Log in of maak een account aan'
      }
    ],

  };
  if(firebase.auth().currentUser && firebase.auth().currentUser != null){
    console.log('already logged in')
    user = firebase.auth().currentUser;
    db = firebase.database();
    loadDiagrams();
  }
  else{
    console.log('starting login')
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  $('.firebaseui-title').text('Log in of maak een account aan')
  db = firebase.database();


})
function loadDiagrams(){
  console.log('loading diagrams of user ' + user.uid)
  var userInfo = db.ref('users/' + user.uid).get().then(function(snap){
    if(snap.exists()){
      userDiagrams = snap.val().diagrams;

      var allDiagrams = db.ref('diagrams/');
      userDiagramData = {};
      for(var i in userDiagrams){
        var userItems = allDiagrams.child(userDiagrams[i]).get().then(function(snap){
          if(snap.exists()){
            var value = snap.val();
            var id = value.id;
            userDiagramData[id] = value;
          }
          reloadMenuButtons()
          if(i == userDiagrams.length - 1){
            loadDiagram(userDiagrams[0])
          }
        })
      }
      console.log('loaded diagrams');
      console.log(userDiagramData);



    }
    else{
      currentDiagramId = (Math.random() * 10000).toFixed(0)
      db.ref('users/' + user.uid).set({
        diagrams:[currentDiagramId],
        name: user.displayName,
      }).then(function(){
        userDiagrams = [currentDiagramId];
        userDiagramData = {}
        saveCurrentDiagramLocally();
        saveCurrentDiagramFirebase();
        reloadMenuButtons();
        loadDiagram(currentDiagramId)

      })
    }
  });

}
function reloadMenuButtons(){
  console.log('reloading diagram buttons')
  $('#sections').empty()
  for(var i in userDiagramData){
    var diagram = userDiagramData[i];
    var name = diagram.title;
    var section = $('<section>');
    section.text(name);
    section.attr('onclick', 'loadDiagram("'+ i+'")').attr('id', i)

    var deletebutton = $('<span>').attr('class', 'delete-diagram material-icons').text('delete');
    section.append(deletebutton);
    deletebutton.on('click', deleteDiagram);
    $('#sections').append(section)
  }
}
function deleteDiagram(){
   event.stopPropagation();
  if(confirm('Weet je zeker dat je de Diagram wilt verwijderen?')){
    var diagramId = $(this).parent().attr('id');

    delete userDiagramData[diagramId];
    for(var i in userDiagrams){
      if(userDiagrams[i] == diagramId){
        userDiagrams.splice(i,1);
        break;
      }
    }
    db.ref('diagrams/' + diagramId).remove().then(function(){
      db.ref('users/' + user.uid + '/diagrams').set(userDiagrams).then(function(){
        loadDiagrams()
        // loadDiagram(userDiagrams[0])
      });
    });
  }
}
function saveCurrentDiagramLocally(){
  var data = getSaveData();
  var info = data[0];
  var items = data[1];
  var lines = data[2];
  var title = info.title;
  if(!title || title.length == 0){
    title = 'Diagram ' + currentDiagramId;
  }
  var id = currentDiagramId;
  userDiagramData[id] = {
     'title': title,
     'lines': lines,
     'items': items,
     'id' : id,
     'uid': user.uid,
  };
  if(userDiagrams.indexOf(id)==-1){
    userDiagrams.push(id);
  }
  return userDiagramData;
}
function saveCurrentDiagramFirebase(){
  reloadMenuButtons();
  $('#lastsaved').text('Opslaan...');
  saveDiagramFirebase(currentDiagramId.toString())
}
function saveDiagramFirebase(id){
  var localData = userDiagramData[id];
  db.ref('diagrams').child(Number(id)).set(localData).then(function(){
    db.ref('users/' + user.uid + '/diagrams').set(userDiagrams).then(function(){
      window.setTimeout(function(){
        $('#lastsaved').text('Laatst opgeslagen om ' + new Date().toLocaleTimeString());
      },300)
    });
  });
}
function loadDiagram(id){
  closeDialog()
  currentDiagramId = id;
  var localData = userDiagramData[id];
  emptyBoard()
  $('#title').val(localData.title);
  var items = localData.items;
  var lines = localData.lines;
  drawItems(items);
  drawLines(lines);
}
function drawItems(items){
  var max = 0;
  for(var i in items){
    if(i > max){max = i}
    var item = items[i];
    var el = $('<div>').attr('id', i).attr('class', item.type);
    el.css('background-color', el.color);
    var text = $('<p>').attr('class', 'text').text(item.label).css('font-size', el.fontSize + 'px');
    var parent = $('tr').eq(item.top).find('td').eq(item.left);
    parent.append(el.append(text))
  }
  max++
  idN = max;

}
function drawLines(lines){
  var max = 0;
  for(var i in lines){
    if(i > max){max = i}
    var item = lines[i];

    var parent1 = $('tr').eq(item.y1).find('td').eq(item.x1).find('div').eq(0);
    var parent2 = $('tr').eq(item.y2).find('td').eq(item.x2).find('div').eq(0);
    fromEl = parent1;
    toEl = parent2;
    console.log(fromEl, toEl)
    connect();
    lineInTheMake.css('stroke', item.color)
    percDivInTheMake.text(item.part)
    percDivInTheMake.css('background-color', item.color)
  }
}
function getSaveData(){
  var items = {}
  var lines = {}
  var info = {
    'title': $('#title').val(),
  }
  $('td div').each(function(){
    items[$(this).attr('id')] = {
      'left': $(this).parent().index(),
      'top':  $(this).parent().parent().index(),
      'color': rgbToHex($(this).css('background-color')),
      'label': $(this).find('.text').text(),
      'fontsize': Number($(this).find('.text').css('font-size').replace('px', '')),
      'type': $(this).attr('class')
    }
  })

  $('line').each(function(){
    var id = $(this).attr('id');
    var split = id.split('-');
    var fromId = split[0]
    var toId = split[1]
    var from = $('#' + fromId)
    var to = $('#' + toId)
    var partId = id + '-part';
    var part = $("#" + partId);
    lines[$(this).attr('id')] = {
      'x1' : from.parent().index(),
      'y1' : from.parent().parent().index(),
      'x2' : to.parent().index(),
      'y2' : to.parent().parent().index(),
      'color': rgbToHex(part.css('background-color')),
      'part': part.text(),
      'type': split[2],
      'partx': part.offset().left,
      'party': part.offset().top
    }
  })

return [info, items, lines]
}
function newDiagram(){
  closeDialog();
  var id = (Math.random() * 10000).toFixed(0);
  saveCurrentDiagramLocally();
  saveCurrentDiagramFirebase();
  currentDiagramId = id;
  emptyBoard();
  saveCurrentDiagramLocally();
  saveCurrentDiagramFirebase();
  loadDiagram(currentDiagramId);
  reloadMenuButtons();
}
function emptyBoard(){
  $('td').empty();
  $('svg').empty();
  $('.part').remove();
  $('#title').val('');
}
