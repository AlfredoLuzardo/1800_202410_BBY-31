// Global variable ImageFile
var ImageFile;

//---------------------------------------------------------------------------------------------------
// This function allows for a user to choose an image file, and displays the image within an element.
//---------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------
// This function gets an imagefile and uploads the iamge to firebase storage, updates the post
// document with the image, and then calls the savePostId function.
// The upload pic function takes the post id as a parameter.
//------------------------------------------------------------------------------------------------
function uploadPic(postID) {
    //console.log("inside uploadPic " + postID);
    if (!ImageFile) {
        alert("No file selected.");
    } else {
        var storageRef = storage.ref("images/" + postID + ".jpg");
        //console.log("STORAGEREF: " + storageRef);
        //console.log("ImageFile: " + ImageFile);

        storageRef.put(ImageFile)   //global variable ImageFile
            .then(function () {
               // console.log('2. Uploaded to Cloud Storage: ');
                storageRef.getDownloadURL()

                    .then(function (url) { // Get URL of the uploaded file
                        //console.log("3. Got the download URL.");
                        db.collection("posts").doc(postID).update({
                            "image": url // Save the URL into users collection
                        })

                            .then(function () {
                                //console.log('4. Added pic URL to Firestore.');
                                savePostId(postID);
                            })
                    })
            })
            .catch((error) => {
                alert("error uploading to cloud storage: " + error);
            })
    }
}

//----------------------------------------------------------------------------------------------
// This function creates a new post document in the posts collection with the user entered data,
// and saves the post ID in the myposts array in the user document of the user who made the post
//----------------------------------------------------------------------------------------------
function incorporatePost() {

    const date = new Date().toLocaleDateString();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // get user entered values from the submitted form element
            let postTitle = document.getElementById('inputPostTitle').value;       //get the value of the element with id="inputPostTitle"
            let postLink = document.getElementById('inputPostLink').value;
            let postSummary = document.getElementById('summaryFormControlTextarea1').value;

            // Checks whether the user has allowed for the website to use their location in the browser, and if they have it gets the
            // longitude and latitude of their device. Then the function adds this, aswell as all the other fields to the posts collection. 
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
                        .then(docRef => { 
                            // Callback function takes a pointer to the post document into parameters, 
                            // gets the ID of the document and passes it into the uploadPic function
                            var ID = docRef.id;
                            uploadPic(ID);
                        })
                })
            }
            
        } else {
            console.log("Error, no user signed in");
        }
    });
}

//---------------------------------------------------------------------------------------------
// This function saves the ID of a post (as a String) to the myposts array in the user document
//---------------------------------------------------------------------------------------------
function savePostId(postID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.update({
                totalposts: firebase.firestore.FieldValue.increment(1),
                myposts: firebase.firestore.FieldValue.arrayUnion(postID)
            })
                .then(() => {
                    window.location.href = "successful_incorporate.html";
                })
        }
    });
}

//--------------------------------------------------------------------------------------------------
// This function redirects the user from incorporate_post.html to the main page main.html - called when the cancel button is clicked
//------------------------------------------------------------------------------------------------
function exitButton() {
    window.location.href = "main.html";
}
