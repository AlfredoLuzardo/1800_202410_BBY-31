//---------------------------------------------------
// This function loads articles into main.html
//---------------------------------------------------
/*
function loadTopArticles() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //! Temporary - will need to replace with actual data from firestore later
            console.log($('.topArticlePlaceholder').load('./text/each_user_post.html')); //! temporarily using each_saved_article, but will not be from saved articles later
        }
    });
}

loadTopArticles();
*/

function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            nameHTML = document.getElementById("name-goes-here");
            userName = user.displayName;
            if (nameHTML != null) {
                nameHTML.innerHTML = user.displayName;
            }

            //**************************************************************************************************************************************************************
            // Get the time that the user joined
            // PUT IN NEW JS FILE
            db.collection("users").doc(user.uid)
                .onSnapshot(userDoc => {
                    const dateJoinedHTML = document.getElementById("dateJoined-goes-here");
                    const countryHTML = document.getElementById("country-goes-here");
                    const articlesSeenHTML = document.getElementById("articlesSeen-goes-here");
                    const articlesPostedHTML = document.getElementById("articlesPosted-goes-here");
                    let dj = userDoc.data().joinDate;
                    let c = userDoc.data().country;
                    let as = userDoc.data().totalread;
                    let ap = userDoc.data().totalposts;
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
            //****************************************************************************************************************** */

            // GET POST VIEW HISTORY FROM USER COLLECTION - DISPLAY VIEW COUNT



        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}
getNameFromAuth();

//---------------------------------------------------
// This function loads the top posts into main.html
//---------------------------------------------------
function getTopPosts() { // RIGHT NOW LOADS ALL OF THE POSTS INTO MAIN
    // get the from the posts collection (LATER CHANGE to get the top (#) of posts)
    

    // display each of them in main.html (call the displayPostDynamically() function in displayPosts.js) (2 hours).
}