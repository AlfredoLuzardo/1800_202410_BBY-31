//------------------------------------------------------------------------------
// Displays all of the posts from the postviewhistory array in the user document 
// to cards in the container in post_history.html.
//------------------------------------------------------------------------------
function displayPostHistory() {

    // Save the name of this function as a String to pass into 
    // displayPostDynamically (simple way to allow displayPostDynamically 
    // function to determine which function called it)
    var functionName = "displayPostHistory";

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var postViewHistory = userDoc.data().postviewhistory;

            postViewHistory.forEach(thisPostID => {
                // Get the id of the post document and pass it into the displayPostDynamically
                db.collection("posts").doc(thisPostID).get()
                .then(doc => {
                    // Call displayPostDynamically function in displayPosts.js file,
                    // passing in the current document in the history array
                    displayPostDynamically(doc, functionName);
                })
            })
        })
        } else { 
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
displayPostHistory();
