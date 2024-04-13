//------------------------------------------------------------------------------
// This function displays one card with information from the post document
// Input parameter is the reference to the current post document in an array
//------------------------------------------------------------------------------
function displayPostDynamically(currPostRef, funcNameCalledBy) {
    // Get the id of the post-container
    let postTemplate = document.getElementById("post-container");

    // Get the id of the post document (to save in view-post-button href location)
    let currPostID = currPostRef.id;

    // Retrieve and save the fields from the post document
    var title = currPostRef.data().title;
    var summary = currPostRef.data().summary;
    var owner = currPostRef.data().owner;
    var date = currPostRef.data().date;
    var image = currPostRef.data().image;                                                 

    // Clone the new card, and assign values to the elements in the card
    let newcard = postTemplate.content.cloneNode(true);

    newcard.querySelector('#post-title').innerHTML = title;
    newcard.querySelector('#post-summary').innerHTML = summary;
    newcard.querySelector('#post-owner').innerHTML = owner;
    newcard.querySelector('#post-timestamp').innerHTML = date;
    newcard.querySelector('#post-image').src = image;                       

    // Add the id of the post document to the href location of the view post button in each post in the list
    // To go to clicked_post.html page with an appended string at the end of the redirection URL with delimeter
    newcard.querySelector('#view-post-button').href = "clicked_post.html?postID="+currPostID;

    // Determine which function called it, and append newcard to the placeholder container in the correct html page
    if (funcNameCalledBy === "displayPostHistory") {
        // Append card to container in post_history.html
        document.getElementById("viewed-posts-go-here").appendChild(newcard);

    } else if (funcNameCalledBy === "displayMyPosts") {
        // Append card to container in profile_page.html
        document.getElementById("user-posts-go-here").appendChild(newcard);

    // Ran out of time to include displaySearchedPosts function for search bar in MVP

    // } else if (funcNameCalledBy === "displaySearchedPosts") {
    //     // Append card to container in searched_articles.html
    //     document.getElementById("searched-posts-go-here").appendChild(newcard);

    } else { // if funcNameCalledBy is "displayTopPosts"
        // Append card to container in main.html
        document.getElementById("top-posts-go-here").appendChild(newcard);
    }
}
