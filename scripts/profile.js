// USER PROFILE PAGE ()

// Loads post placeholder into position. CURRENTLY NOT USED
function loadUserPost() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log($('.userPostPlaceholder').load('./text/each_user_post.html'));
        }
    });
}

loadUserPost();


// Displays all of the posts in the myposts array in the user document.
function displayMyPosts() {
    // Save the name of this function as a String to pass into 
    // displayPostDynamically (simple way to allow displayPostDynamically 
    // function to determine which function called it)
    var functionName = "displayMyPosts";

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var myposts = userDoc.data().myposts;
            console.log(myposts);

            myposts.forEach(thisPostID => {
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

displayMyPosts();
