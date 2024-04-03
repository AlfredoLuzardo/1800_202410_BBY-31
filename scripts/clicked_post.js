
//======================
// Global Variables
//======================

// Get the post document id from the postID query argument in the searchParams 
// property of the current URL (using .get method)
var currentURL = new URL( window.location.href ); //get URL of the search bar
var clickedPostID = currentURL.searchParams.get("postID"); //get value for the key "postID"

// Get a reference to the user document
var userDocRef;

firebase.auth().onAuthStateChanged( user => {
  if (user) {
    userDocRef = db.collection( "users" ).doc( user.uid );
    keepAddToHistoryButtonSelected();
  } else {
    // No user is signed in.
    console.log( "No user is signed in" );
    window.location.href = "login.html";
  }
});

// This function displays the components of each post, by taking the field values form data stores
// and modifying their corresponding card elements in the post container in clicked_post.html
function displayPostInfo() {
    
    // Get a reference to the post document of the clicked post
    db.collection("posts").doc(clickedPostID).get()
        .then((postDocRef) => {
            // Get the title, image, summary, post owner, and date fields from the post document
            let title = postDocRef.data().title;
            var summary = postDocRef.data().summary;
            var owner = postDocRef.data().owner;
            var date = postDocRef.data().date;

            // WILL ADD IMAGE ONCE FUNCTION IS FIXED
            // let image = currentPostId.data().image;

            // Example code from tech tip
            //let imgEvent = document.querySelector( ".hike-img" );
            //imgEvent.src = "../images/" + hikeCode + ".jpg";

            // (ADD COMMENTS IF TIME)

            // Populate the title, image, summary, post owner, and date placeholders in clicked_post.html
            document.getElementById("post-titletext").innerHTML = title;
            document.getElementById("post-content-placeholder").innerHTML = summary;
            document.getElementById("post-owner-placeholder").innerHTML = owner;
            document.getElementById("date-posted-placeholder").innerHTML = date;
        });
}
displayPostInfo();

// This function adds or removes the current post to the postviewhistory array, increments or decrements the value of totalread
// in the Firestore database (called from onclick event in read post button) by 1, and increments or decrements the viewcount
// of the post document by 1. Increment occurs when the post does not exist in the viewposthistory array, otherwise, decrement
// occurs.
function addOrRemovePostFromHistory() {

    // Get the information from the reference to the document (using .get method)
    userDocRef.get().then((userDoc) => {
        let postViewHistory = userDoc.data().postviewhistory;

        // Check if the postviewhistory array is defined and if this bookmark already exists in Firestore
        if (postViewHistory && postViewHistory.includes(clickedPostID)) {
            // If it exists, remove the post from the postviewhistory array
            userDocRef.update({
                postviewhistory: firebase.firestore.FieldValue.arrayRemove(clickedPostID)
            })
            .then(function () {
                // Decrement totalread count of the user document by 1
                userDocRef.update({
                totalread: firebase.firestore.FieldValue.increment(-1)
                })
            })
            .then(() => {
                // Decrement the viewcount number of the post document by 1
                db.collection("posts").doc(clickedPostID).update({
                    viewcount: firebase.firestore.FieldValue.increment(-1)
                });
            })
            .then(function () {
                alert("Post successfully removed from history");

                document.getElementById("add-post-to-history-button").innerText = "Remove this post from history";
            })
            .then(function () {

                // Change the colour of the button by replacing the bootstrap button colour class
                document.getElementById("add-post-to-history-button").classList.replace('btn-secondary','btn-primary');
            });
        } else {
            // If it doesn't exist, add the post to the postviewhistory array
            userDocRef.set(
                {
                    postviewhistory: firebase.firestore.FieldValue.arrayUnion(clickedPostID)
                },
                {
                    merge: true,
                }
            )
            .then(function () {
                // Increment totalread count of the user document by 1
                userDocRef.update({
                totalread: firebase.firestore.FieldValue.increment(1)
                })
            })
            .then(() => {
                // Increment the viewcount number of the post document by 1
                db.collection("posts").doc(clickedPostID).update({
                    viewcount: firebase.firestore.FieldValue.increment(1)
                });
            })
            .then(function() {
                alert("Post successfully added to history");
                document.getElementById("add-post-to-history-button").innerText = "Save this post to history";
            })
            .then(function () {
                
                // Change the colour of the button by replacing the bootstrap button colour class
                document.getElementById("add-post-to-history-button").classList.replace('btn-primary', 'btn-secondary');
            });
        }
    });
}

// This function keeps the add post to history button selected
// if the page is reloaded
// (Some code is used from Tech Tip B04)
function keepAddToHistoryButtonSelected() {
    userDocRef.get().then(userDoc => {
    
        //get the name of the user
        var postViewHistory = userDoc.data().postviewhistory;

        // If the postviewhistory field is not null the current post
        // if in the postviewhistory array includes the id of the post
        // document
        if (postViewHistory && postViewHistory.includes(clickedPostID)) {
            document.getElementById("add-post-to-history-button").innerText = "Remove this post from history";
            
            // Change the colour of the button by replacing the bootstrap button colour class
            document.getElementById("add-post-to-history-button").classList.replace('btn-primary', 'btn-secondary');
        }
    });
}
