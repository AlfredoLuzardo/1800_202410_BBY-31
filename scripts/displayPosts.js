
//------------------------------------------------------------------------------
// This function displays one card with information from the post document
// Input parameter is the reference to the current post document in an array
//------------------------------------------------------------------------------
function displayPostDynamically(currentDoc, funcNameCalledBy) {
    // Get the id of the post-container
    let postTemplate = document.getElementById("post-container");

    var title = currentDoc.data().title;
    var summary = currentDoc.data().summary;
    var owner = currentDoc.data().owner;
    var date = currentDoc.data().date;
    var image = currentDoc.data().image;

    // Clone the new card, and assign values to the elements 
    // in the card
    let newcard = postTemplate.content.cloneNode(true);

    console.log("title:" + title);

    newcard.querySelector('#post-title').innerHTML = title;
    newcard.querySelector('#post-summary').innerHTML = summary;
    newcard.querySelector('#post-owner').innerHTML = owner;
    newcard.querySelector('#post-timestamp').innerHTML = date;
    newcard.querySelector('#post-image').src = `./images/${image}.jpg`;

    // Determine which function called it, and append newcard to the 
    // placeholder container in the correct html page
    if (funcNameCalledBy === "displayPostHistory") {
        // Append card to container in post_history.html
        document.getElementById("viewed-posts-go-here").appendChild(newcard);

    } else if (funcNameCalledBy === "displayMyPosts") {
        // Append card to container in profile_page.html
        document.getElementById("user-posts-go-here").appendChild(newcard);

    } else if (funcNameCalledBy === "displaySearchedPosts") {
        // Append card to container in searched_articles.html                              // CHANGE NAME LATER
        document.getElementById("searched-posts-go-here").appendChild(newcard);

    } else { // if funcNameCalledBy is "displayTopPosts"
        // Append card to container in main.html
        document.getElementById("top-posts-go-here").appendChild(newcard);
    }
}

