function loadSavedArticle(){
    firebase.auth().onAuthStateChanged(function (user){
        if (user){
            console.log($('.savedArticlePlaceholder').load('./text/each_saved_article.html'));
        } 
    });
}

loadSavedArticle();
