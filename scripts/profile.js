
// Displays the info from the user document to the card form in the user profile page profile_page.html
function displayProfileInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            db.collection("users").doc(user.uid)
            .onSnapshot(userDoc => {
                const dateJoinedHTML = document.getElementById("dateJoined-goes-here");
                const countryHTML = document.getElementById("country-goes-here");
                const articlesSeenHTML = document.getElementById("articlesSeen-goes-here");
                const articlesPostedHTML = document.getElementById("articlesPosted-goes-here");
                const nameHTML = document.getElementById("name-goes-here");
                let dj = userDoc.data().joinDate;
                let c = userDoc.data().country;
                let as = userDoc.data().totalread;
                let ap = userDoc.data().totalposts;
                let userName = user.displayName;

                if (nameHTML != null) {
                    nameHTML.innerHTML = userName;
                }
                if (dateJoinedHTML != null){
                    dateJoinedHTML.innerHTML = dj;
                }

                if (countryHTML != null){
                    countryHTML.innerHTML = c;
                }  

                if (articlesSeenHTML != null){
                    articlesSeenHTML.innerHTML = as;
                }

                if (articlesPostedHTML != null){
                    articlesPostedHTML.innerHTML = ap;
                }
            })

        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}
displayProfileInfo();


// Displays all of the posts in the myposts array in the user document 
// in the user document to cards in the container in profile.html.
function displayMyPosts() {
    // Save the name of this function as a String to pass into 
    // displayPostDynamically (simple way to allow displayPostDynamically 
    // function to determine which function called it)
    var functionName = "displayMyPosts";

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var myposts = userDoc.data().myposts;
            console.log(myposts);

            myposts.forEach(thisPostID => {
                // Get the id of the post document and pass it into the displayPostDynamically
                db.collection("posts").doc(thisPostID).get()
                .then(doc => {
                    // Call displayPostDynamically function in displayPosts.js file,
                    // passing in the current document in the history array
                    displayPostDynamically(doc, functionName);
                })
            })
        })
        } else { 
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}

displayMyPosts();
