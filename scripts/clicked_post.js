
function displayPostInfo() {
    // Get the post document id from the postID query argument in the searchParams 
    // property of the current URL (using .get method)
    let currentURL = new URL( window.location.href ); //get URL of the search bar
    let clickedPostID = currentURL.searchParams.get("postID"); //get value for the key "postID"

    // Get a reference to the post document of the clicked post
    db.collection("posts").doc(clickedPostID).get()
        .then(postDocRef => {
            // Get the title, image, summary, post owner, and date fields from the post document
            let title = postDocRef.data().title;
            var summary = postDocRef.data().summary;
            var owner = postDocRef.data().owner;
            var date = postDocRef.data().date;

            // WILL ADD IMAGE ONCE FUNCTION IS FIXED ///////////////////////////////////////////////////////
            // let image = currentPostId.data().image;
            // Example code from tech
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

/*
// Save the document ID of the post in local storage
function savePostDocIDAndGoToArticle() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('postDocID', ID);
    console.log("Article card was clicked!");
    window.location.href = 'clicked_post.html';
}
*/

// This function adds the current post to the history array, and increment the value of totalread
// in the Firestore database (called from onclick event in read post button)
function addPostToHistory() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let userDoc = db.collection("users").doc(user.uid);

            // Get the user document id
            let userId = userDoc.id;

            // Get the post document id from the postID query argument in the searchParams 
            // property of the current URL (using .get method)
            let currentURL = new URL(window.location.href);
            let clickedPostID = currentURL.searchParams.get("postID");

            // Add the post id of the the viewed post into the postsviewhistory array in the user document (using .update)
            db.collection("users").doc(userId).update({
                postviewhistory: firebase.firestore.FieldValue.arrayUnion(clickedPostID)
            })
            .then(() => {

                // Get the reference of the corresponding user document
                var userDocRef = db.collection("users").doc(userId);

                let totalRead = userDocRef.totalread;
                alert(totalRead);

                 //if () { // NEED TO FIX, PREVENT USERS FROM PRESSING THE BUTTON MORE THAN ONCE - Jason
                    alert("Adding this post to history"); // Change later with a confirmation pop-up (if time)

                    // Increment totalread count by 1
                    userDocRef.update({
                        totalread: firebase.firestore.FieldValue.increment(1)
                    })
                //}
            });
        }
    });
}
