//---------------------------------------------------
// This function loads articles into searched_articles.html
//---------------------------------------------------
function loadSearchedArticle(){
    firebase.auth().onAuthStateChanged(function (user){
        if (user){
            //! Temporary - will need to replace with actual data from firestore later
            console.log($('.searchedArticlePlaceholder').load('./text/each_user_post.html')); //! temporarily using each_saved_article, but will not be from saved articles later
        } 
    });
}

loadSearchedArticle();
