//---------------------------------------------------
// Adds an event listener to the articles-section id element
// (the div for a single article card from the list)
// in each_article.html
//---------------------------------------------------


/*
// NEED TO GET THE CORRECT ARTICLE DATA IN THIS FUNCTION LATER,
// OR CALL ANOTHER FUNCTION TO DISPLAY THE INFORMATION
let articleCardList = document.querySelectorAll(".post-container");
// Null check and must have at least one article in the list
if (articleCardList && articleCardList.length > 0) {
    articleCardList.forEach((element) => {
        element.addEventListener("click", goToArticle);
    });
}
*/


/*
function displayHikeInfo() {
    let params = new URL( window.location.href ); //get URL of the search bar
    let ID = params.searchParams.get( "docID" ); //get value for the key "id"
    console.log( ID );

    db.collection( "posts" )
        .doc( ID )
        .get()
        .then( doc => {
            let thisPost = doc.data();
            //postCode = thisPost.code;
            postTitle = doc.data().title;
            
            // only populate title
            document.getElementById( "" ).innerHTML = postTitle;
            //let imgEvent = document.querySelector( ".hike-img" );
            //imgEvent.src = "../images/" + hikeCode + ".jpg";
        } );
}
displayHikeInfo();
*/


// Go to clicked_post.html page
function goToArticle() {
    console.log("Article card was clicked!");
    window.location.href = 'clicked_post.html';
}
