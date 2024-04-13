const date = new Date().toLocaleDateString();

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;                            // get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) {         //if new user
        db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
          name: user.displayName,                    //"users" collection
          email: user.email,                         //with authenticated user's ID (user.uid)
          country: "Canada",                      //optional default profile info    
          totalposts: 0,  
          totalread: 0,
          joinDate: date,                          //optional default profile info
          myposts: [], // Array for storing posts created by the user as Strings
          postviewhistory: [] // Array for storing posts viewed by the user 
                              // (post is added when the user presses the viewed post button in clicked_article.html)
        }).then(function () {
          console.log("New user added to firestore");
          window.location.assign("main.html");       //re-direct to main.html after signup
        }).catch(function (error) {
          console.log("Error adding new user: " + error);
        });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'main.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);