//---------------------------------------------------
// This function loads articles into main.html
//---------------------------------------------------
function loadTopArticles(){
    firebase.auth().onAuthStateChanged(function (user){
        if (user){
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
            
            //**************************************************************************************************************************************************************
            // Get the time that the user joined
            // PUT IN NEW JS FILE!
            db.collection("users").doc(user.uid)
                .onSnapshot(userDoc => {
                    document.getElementById("dateJoined-goes-here").innerHTML = userDoc.data().joinDate;
                    document.getElementById("country-goes-here").innerHTML = userDoc.data().country;
                })
            //****************************************************************************************************************** */

            // GET POST VIEW HISTORY FROM USER COLLECTION - DISPLAY VIEW COUNT

            userName = user.displayName;
            document.getElementById("name-goes-here").innerText = userName;

        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function


//**************************************************************************************************************************************************************
// PUT IN A FILE CALLED profile.js

// //ATTEMPT TO READ FROM THE POSTS ARRAY IN USERS COLLECTION.
function displayUserPostsDynamically() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let postTemplate = document.getElementById("post-container");
            /* Not sure how to access an array from a document, or how to use its information to
            access another collection, so instead I created a subcollection*/
            var collection = db.collection('users').doc(user.uid).collection('posts')
            console.log(collection);

            collection.get()
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

                        document.getElementById("posts-go-here").appendChild(newcard);
                    })
                })
        }
    })
}

displayUserPostsDynamically();
