// Global variable ImageFile
var ImageFile;

// Function listen file select.
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("inputImage"); // pointer #1
    const image = document.getElementById("image-goes-here"); // pointer #2

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; // Display this image
    })
}
listenFileSelect();

// Need to fix
function uploadPic(postID) {
    alert("inside uploadPic " + postID);
    if (!ImageFile) {
        alert("No file selected.");
    } else {
        var storageRef = storage.ref("images/" + postID + ".jpg");
        alert("STORAGEREF: " + storageRef);
        alert("ImageFile: " + ImageFile);
        var blob = URL.createObjectURL(ImageFile);
        alert(blob);

        storageRef.put(ImageFile)   //global variable ImageFile
            .then(function () {
                alert('2. Uploaded to Cloud Storage: ');
                storageRef.getDownloadURL()

                    .then(function (url) { // Get URL of the uploaded file
                        alert("3. Got the download URL.");
                        db.collection("posts").doc(postID).update({
                            "image": url // Save the URL into users collection
                        })

                            .then(function () {
                                alert('4. Added pic URL to Firestore.');
                                savePostId(postID);
                            })
                    })
            })
            .catch((error) => {
                alert("error uploading to cloud storage: " + error);
            })
    }
}

//=======================================
// This function creates a new post document in the posts collection with the user entered data,
// and saves the post ID in the myposts array in the user document of the user who made the post
//=======================================
function incorporatePost() {

    const date = new Date().toLocaleDateString();
    console.log("Submit Clicked");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            //a) get user entered values
            let postTitle = document.getElementById('inputPostTitle').value;       //get the value of the field with id="inputPostTitle"
            let postLink = document.getElementById('inputPostLink').value;
            let postSummary = document.getElementById('summaryFormControlTextarea1').value;

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    var postsCollection = db.collection('posts');

                    postsCollection.add({
                        title: postTitle,
                        link: postLink,
                        summary: postSummary,
                        owner: user.displayName,
                        date: date,
                        viewcount: 0,
                        lat: latitude,
                        long: longitude,
                    })
                        .then(docRef => { // Callback function takes a pointer to the post document into parameters
                            var ID = docRef.id;
                            uploadPic(ID);
                            savePostId(ID);
                            window.location.href = "successful_incorporate.html";
                            
                        });
                });
            }
        } else {
            console.log("Error, no user signed in");
        }
    });
    // disable edit (ADD EDITING OF POST IF TIME)
}

// This function saves the ID of a post (as a String) to the myposts array in the user document
function savePostId(postID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);

            currentUser.update({
                totalposts: firebase.firestore.FieldValue.increment(1),
                myposts: firebase.firestore.FieldValue.arrayUnion(postID)
            });
        }
    });
}

function exitButton() {
    window.location.href = "main.html"; // REDIRECTS TO main.html FOR NOW - CHANGE LATER IF TIME
    console.log("Exit Clicked in incorporate_post.html");
}
