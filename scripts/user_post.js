function loadUserPost(){
    firebase.auth().onAuthStateChanged(function (user){
        if (user){
            console.log($('.userPostPlaceholder').load('./text/each_user_post.html'));
        } 
    });
}

loadUserPost();
