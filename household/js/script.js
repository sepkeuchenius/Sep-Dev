var user;
var db;
var userHouses;
var userHouseData = {};
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
        loadUser();
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
    loadUser();
  }
  else{
    console.log('starting login')
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  $('.firebaseui-title').text('Log in of maak een account aan')
  db = firebase.database();
})
function getStarted(){
  $('#landing-brand').hide();
  $('#login').fadeIn()
}
function loadUser(){
  showHouses();
  var userInfo = db.ref('users/' + user.uid).get().then(function(snap){
    if(snap.exists()){
      userHouses = snap.val().Houses;
      for(var i in userHouses){
        var userInfo = db.ref('houses/' + userHouses[i]).get().then(function(snap){
          if(snap.exists()){
            userHouseData[userHouses[i]] = snap.val();
            loadHouse(userHouses[i])
          }

        })
      }
    }
  });
}
function icon(type, color = 'white'){
  return $('<i>').attr('class', 'material-icons').text(type).css('color', color);
}
function loadHouse(id){
  var house = userHouseData[id];
  var houseElement = $('<div>').attr('class', 'house').attr('id', id).text(house.Name);
  var a = $('<button>').html(icon('arrow_forward')).attr("class", "trans").on('click', loadDashboard)
  $('#house-elements').append(houseElement)
  houseElement.append($("<br>"));
  houseElement.append(a);
}
function showHouses(){
  $('.page').hide();
  $('#house-elements').empty()
  $('#houses').show();
}
function loadDashboard(){
  $('.page').hide();
  var src = $(this).parent().attr('id');
  var house = userHouseData[src];
  $('#house-name').text(house.Name);
  

  $('#house').fadeIn();
}
