
function displayPostInfo() {
    let params = new URL( window.location.href ); //get URL of the search bar
    let ID = params.searchParams.get( "docID" ); //get value for the key "id"
    console.log( ID );

    db.collection( "posts" )
        .doc( ID )
        .get()
        .then( doc => {
            let thisPost = doc.data();
            //postCode = thisPost.code;
            postTitle = doc.data().title;
            
            // only populate title
            document.getElementById( "" ).innerHTML = postTitle;
            //let imgEvent = document.querySelector( ".hike-img" );
            //imgEvent.src = "../images/" + hikeCode + ".jpg";
        } );
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

// Add the current post to the history array, and increment the value of totalread
// in the Firestore database
function addPostToHistory() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            const increment = firebase.firestore.FieldValue.increment(1);

            // Get the reference of the correspodning user document
            let userDocReference = db.collection("users").doc(user.uid);

            // Update totalread count
            userDocReference.update({ totalread: increment });

            // Add a reference to the current post to the postsviewhistory 
            // array in Firestore
            let params = new URL( window.location.href ); //get URL of the search bar
            let ID = params.searchParams.get( "docID" ); //get value for the key "id"
            console.log( ID );

            // userDocReference.data().postviewhistory;

            // (INCOMPLETE) Need to research how to add a reference to a document 
            // in "posts" collection to the postviewhistory array

        }
    });
}