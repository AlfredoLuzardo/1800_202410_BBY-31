var currentUser;
function incorporatePost() {

    const date = new Date().toLocaleDateString();
    console.log("Submit Clicked");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            //a) get user entered values
            let postTitle = document.getElementById('inputPostTitle').value;       //get the value of the field with id="inputPostTitle"
            let postLink = document.getElementById('inputPostLink').value;
            let postImage = document.getElementById('inputImage').value;
            let postSummary = document.getElementById('summaryFormControlTextarea1').value;


            var postsCollection = db.collection('posts');
            postsCollection.add({
                title: postTitle,
                link: postLink,
                image: postImage,
                summary: postSummary,
                owner: user.displayName,
                date: date
            })

                .then((docRef) => {
                    let postID = docRef.id;
                    alert(postID);
                    localStorage.setItem('postID', postID);
                    console.log("Post document successfully added!");
                    window.location.href = "successful_incorporate.html"; // Redirect to the successful_incorporate page
                });
        }
    })
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