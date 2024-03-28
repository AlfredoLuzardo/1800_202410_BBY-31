
function displayPostHistory() {
    // Save the name of this function as a String to pass into 
    // displayPostDynamically (simple way to allow displayPostDynamically 
    // function to determine which function called it)
    var functionName = "displayPostHistory";

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid).get()
                .then(userDoc => {
                    // Get the postsviewhistory array from Firestore
                    var history = userDoc.data().history;

                    history.forEach(thisPostID => {
                        db.collection("posts").doc(thisPostID).get().then(doc => {
                            // Call displayPostDynamically function in displayPosts.js file,
                            // passing in the current document in the history array
                            displayPostDynamically(doc, functionName);
                        })
                    })
                })
        }
    });
}

//loadSavedArticle();

function removeButton() {
    console.log("Remove Clicked");
    alert("Remove Clicked");
}
