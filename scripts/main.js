
//--------------------------------------------------------------------------------
// Displays the name of the currently logged-in user, and the number of posts read
//--------------------------------------------------------------------------------
function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // console.log(user.uid);
            // console.log(user.displayName);

            // User Name
            nameHTML = document.getElementById("name-goes-here");
            userName = user.displayName;
            
            if (nameHTML != null) {
                nameHTML.innerHTML = user.displayName;
            }

            // Number of posts read
            db.collection("users").doc(user.uid)
                .onSnapshot(userDoc => {
                    const postsReadHTML = document.getElementById("num-posts-read-goes-here");
                    let numPostsRead = userDoc.data().totalread;

                    if (postsReadHTML != null){
                        postsReadHTML.innerHTML = numPostsRead;
                    }
                })
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
function getTopPosts() {

    // Save the name of this function as a String to pass into 
    // displayPostDynamically (simple way to allow displayPostDynamically 
    // function to determine which function called it)
    var functionName = "displayTopPosts";
    
    // Ran out of time to make this function get the top (#) of posts), so lef

    // Get all of the posts from the posts collection, and display each of them 
    // in main.html, by calling the displayPostDynamically() function in displayPosts.js
    db.collection('posts').get().then((postCollRef) => {
        postCollRef.forEach((postDocRef) => {
            console.log(postDocRef.id, " => ", postDocRef.data());
            
            // Call displayPostDynamically function in displayPosts.js file,
            // passing in the current document in the history array
            displayPostDynamically(postDocRef, functionName);

        });
    });
}
getTopPosts();

//-------------------------------------------------------------------------------------------------
// SIDE PANEL FUNCTIONALITY FOR POSTS IN main.html
// Javascript code adapted from: https://codepen.io/dcode-software/pen/OJxEWWz
//
// Add click event for the side panel toggle button.
// When clicked, opens the side panel by removing a class property of the main element in main.html,
// which was being used as a selector for the display hidden property
//-------------------------------------------------------------------------------------------------

// Variable that is set to the size of the mobile display media query
var size = window.matchMedia("(max-width: 700px)");

document.querySelector(".side-panel-toggle").addEventListener('click', () => {
    document.querySelector(".main-wrapper").classList.toggle("side-panel-open-property");

    if (document.querySelector(".main-wrapper").classList.contains("side-panel-open-property")) {
        // Checks whether the size matches, and if it does hides the map.
        if (size.matches){
            document.getElementById("map").setAttribute("hidden", "hidden");
        }
        let newText = "Hide top posts";
        document.querySelector(".side-panel-toggle-text").innerHTML = newText;
    } else {
        // Checks whether the size matches, and if it does shows the map.
        if (size.matches) {
            document.getElementById("map").removeAttribute("hidden");
        }
        let newText = "Show top posts";
        document.querySelector(".side-panel-toggle-text").innerHTML = newText;
    }
    
    // Load the map again to account for the change in width
    showMap();
});

//-----------------------------------------------------------------------------------
// Hide the welcome banner when the close button is clicked
//-----------------------------------------------------------------------------------
document.querySelector(".close-page-banner-button").addEventListener('click', () => {

    document.querySelector(".page-banner").style.display = "none";

});
