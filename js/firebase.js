// Initialize the FirebaseUI Widget using Firebase.
var user;
var db;
$(document).ready(function(){
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        user = authResult.user;
        db = firebase.database();
        var userItems = db.ref().child('users').child('0').get().then(function(snap){
          if(snap.exists()){
            console.log(snap.val())
          }
          else{
            console.log('failed')
          }
        })
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
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],

  };
  if(firebase.auth().currentUser && firebase.auth().currentUser != null){
    user = firebase.auth().currentUser;
    db = firebase.database();
    var userItems = db.ref().child('diagrams').get().then(function(snap){
      if(snap.exists()){
        console.log(snap.val())
      }
      else{
        console.log('failed')
      }
    })
  }
  else{
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }


})
