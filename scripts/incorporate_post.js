var currentUser;
var ImageFile;
function listenFileSelect() {
      // listen for file selection
      var fileInput = document.getElementById("inputImage"); // pointer #1
      const image = document.getElementById("image-goes-here"); // pointer #2

			// When a change happens to the File Chooser Input

      if (fileInput != null){
        fileInput.addEventListener('change', function (e) {
            ImageFile = e.target.files[0];   //Global variable
            var source = URL.createObjectURL(ImageFile);
            image.src = source; // Display this image
        })
      }
      
}
listenFileSelect();

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
                    uploadPic(postID)
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



function uploadPic(postID) {
    alert("inside uploadPic " + postID);
    var storageRef = storage.ref("images/" + postID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile
       
                   // AFTER .put() is done
        .then(function () {
            alert('2. Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                 // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    alert("3. Got the download URL.");

                    // Now that the image is on Storage, we can go back to the
                    // post document, and update it with an "image" field
                    // that contains the url of where the picture is stored.
                    db.collection("posts").doc(postID).update({
                            "image": url // Save the URL into users collection
                        })
                         // AFTER .update is done
                        .then(function () {
                            alert('4. Added pic URL to Firestore.');
                        })
                })
        })
        .catch((error) => {
             console.log("error uploading to cloud storage");
        })
}