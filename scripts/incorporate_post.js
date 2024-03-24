
function incorporatePost() {
    console.log("Submit Clicked");
    //alert("Submit Clicked");
        //enter code here
   
        //a) get user entered values
        let postTitle = document.getElementById('inputPostTitle').value;       //get the value of the field with id="inputPostTitle"
        let postLink = document.getElementById('inputPostLink').value;
        let imageUrl = document.getElementById('inputImageUrl').value;
        let postSummary = document.getElementById('summaryFormControlTextarea1').value;
   
        //b) add a new post to the posts document with filled out fields in Firestore
        var postsCollection = db.collection('posts');
        postsCollection.add({
            title: postTitle,
            link: postLink,
            image: imageUrl,
            summary: postSummary,
        //lat: 49.2467097082573,
        //lng: -122.9187029619698,
        //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        })
        .then(() => {
            console.log("Post document successfully added!");
            window.location.href = "successful_incorporate.html"; // Redirect to the successful_incorporate page
        });

        //c) add a new post to the posts document to the posts subcollection in users colletion in Firestore
        var userPostsCollection = db.collection('users').doc(user.uid).collection('posts');
        userPostsCollection.add({
            title: postTitle,
            link: postLink,
            image: imageUrl,
            summary: postSummary,
        //lat: 49.2467097082573,
        //lng: -122.9187029619698,
        //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        })
        .then(() => {
            console.log("User Post document successfully added!");
        });
   
        //d) disable edit (finish later)
}

function exitButton() {
    console.log("Exit Clicked");
    alert("Exit Clicked");
}

/*
var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            let userName = userDoc.data().name;
                            let userSchool = userDoc.data().school;
                            let userCity = userDoc.data().city;

                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                            }
                            if (userSchool != null) {
                                document.getElementById("schoolInput").value = userSchool;
                            }
                            if (userCity != null) {
                                document.getElementById("cityInput").value = userCity;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }
*/