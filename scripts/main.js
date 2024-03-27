//---------------------------------------------------
// This function loads articles into main.html
//---------------------------------------------------
function loadTopArticles() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //! Temporary - will need to replace with actual data from firestore later
            console.log($('.topArticlePlaceholder').load('./text/each_user_post.html')); //! temporarily using each_saved_article, but will not be from saved articles later
        }
    });
}

loadTopArticles();

function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            userName = user.displayName;
            if (user.displayName != null) {
                document.getElementById("name-goes-here").innerHTML = `Test: ${user.displayName}`;
            }

            //**************************************************************************************************************************************************************
            // Get the time that the user joined
            // PUT IN NEW JS FILE!
            db.collection("users").doc(user.uid)
                .onSnapshot(userDoc => {
                    const jdHTML = document.getElementById("dateJoined-goes-here");
                    const cHTML = document.getElementById("country-goes-here");
                    let jd = userDoc.data().joinDate;
                    let c = userDoc.data().country;
                    if (jdHTML !== null){
                        jdHTML.innerHTML = jd;
                    }

                    if (cHTML !== null){
                        cHTML.innerHTML = c;
                    }   
                })
            //****************************************************************************************************************** */

            // GET POST VIEW HISTORY FROM USER COLLECTION - DISPLAY VIEW COUNT



        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function

function displayPostsDynamically(collection) {
    let postTemplate = document.getElementById("post-container");

    db.collection(collection).get()
        .then(allPosts => {
            allPosts.forEach(doc => {
                var title = doc.data().title;
                var summary = doc.data().summary;
                var owner = doc.data().owner;
                var timestamp = doc.data().timestamp;
                var image = doc.data().image;

                let newcard = postTemplate.content.cloneNode(true);
                newcard.querySelector('.post-title').innerHTML = title;
                newcard.querySelector('#post-summary').innerHTML = summary;
                newcard.querySelector('.post-owner').innerHTML = owner;
                newcard.querySelector('.post-timestamp').innerHTML = timestamp;
                newcard.querySelector('.post-image').src = `./images/${image}.jpg`;

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })

}

// displayPostsDynamically("posts");
