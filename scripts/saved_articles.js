function loadSavedArticle(){
    firebase.auth().onAuthStateChanged(function (user){
        if (user){
            console.log($('.savedArticlePlaceholder').load('./text/each_user_post.html'));
        } 
    });
}

loadSavedArticle();

function removeButton() {
    console.log("Remove Clicked");
    alert("Remove Clicked");
}
