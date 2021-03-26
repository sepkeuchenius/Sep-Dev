// Initialize the FirebaseUI Widget using Firebase.
var uid;
$(document).ready(function(){
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
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
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  if(firebase.auth().currentUser && firebase.auth().currentUser != null){
    uid = firebase.auth().currentUser.uid;
  }
  else{
    ui.start('#firebaseui-auth-container', uiConfig);
  }
})
