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
    }
    
    var storageRef = storage.ref("images/" + postID + ".jpg");
    alert("STORAGEREF.PUT: " + storageRef.put(ImageFile));

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

function incorporatePost() {

    const date = new Date().toLocaleDateString();
    console.log("Submit Clicked");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            //a) get user entered values
            let postTitle = document.getElementById('inputPostTitle').value;       //get the value of the field with id="inputPostTitle"
            let postLink = document.getElementById('inputPostLink').value;
            let postSummary = document.getElementById('summaryFormControlTextarea1').value;


            var postsCollection = db.collection('posts');
            postsCollection.add({
                title: postTitle,
                link: postLink,
                summary: postSummary,
                owner: user.displayName,
                date: date
            })

                .then((docRef) => {
                    var ID = docRef.id;
                    console.log(ID);
                    uploadPic(ID);
                    window.location.href = "successful_incorporate.html"; // Redirect to the successful_incorporate page
                });
        } else {
            console.log("Error, no user signed in");
        }
    })
    // disable edit (finish later)
}

function exitButton() {
    console.log("Exit Clicked");
    alert("Exit Clicked");
}

// Function to save posts to an array.
function savePostId(postID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            console.log(user)
            currentUser.update({
                totalposts: firebase.firestore.FieldValue.increment(1),
                myposts: firebase.firestore.FieldValue.arrayUnion(postID)
            });
        }
    })
}