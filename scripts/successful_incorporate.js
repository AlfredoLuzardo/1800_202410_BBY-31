var postID = localStorage.getItem("postID");
var currentUser;

console.log(postID);

// Function to save posts to an array.
function savePosts(postID){
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            
            currentUser = db.collection("users").doc(user.uid);
            console.log(user)
            currentUser.update({
                totalposts: firebase.firestore.FieldValue.increment(1),
                myposts: firebase.firestore.FieldValue.arrayUnion(postID)
            });
            
        }
    })
}

savePosts(postID);
