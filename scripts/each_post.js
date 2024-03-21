//---------------------------------------------------
// Adds an event listener to the articles-section id element
// (the div for a single article card from the list)
// in each_article.html
//---------------------------------------------------

// NEED TO GET THE CORRECT ARTICLE DATA IN THIS FUNCTION LATER,
// OR CALL ANOTHER FUNCTION TO DISPLAY THE INFORMATION
let articleCardList = document.querySelectorAll(".post-container");
// Null check and must have at least one article in the list
if (articleCardList && articleCardList.length > 0) {
    articleCardList.forEach((element) => {
        element.addEventListener("click", goToArticle);
    });
}

function goToArticle() {
    console.log("Article card was clicked!");
    window.location.href = 'clicked_post.html';
}
