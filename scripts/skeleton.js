//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {         
            // User is signed in.
            // Loads all of the logged in placeholders
            console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
            console.log($('#stickyFooterPlaceholder').load('./text/sticky_footer.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
            
            // Load the template post into post_history.html, profile_page,html, 
            // searched_articles.html, main.html
            console.log($('#top-post-template').load('./text/each_user_post.html'));
            console.log($('#viewed-post-template').load('./text/each_user_post.html'));
            console.log($('#user-post-template').load('./text/each_user_post.html'));
            console.log($('#searched-post-template').load('./text/each_user_post.html'));
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('./text/nav_before_login.html'));
            console.log($('#stickyFooterPlaceholder').load('./text/sticky_footer.html'));
        }
    });
}
loadSkeleton();
