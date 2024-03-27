// USER PROFILE PAGE ()

// Loads post placeholder into position. CURRENTLY NOT USED
function loadUserPost() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log($('.userPostPlaceholder').load('./text/each_user_post.html'));
        }
    });
}

loadUserPost();


// Displays the posts itself. No function to pass it to yet.
function displayMyPosts() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var myposts = userDoc.data().myposts;
            console.log(myposts);

            let postTemplate = document.getElementById("post-container");

            myposts.forEach(thisPostID => {
                db.collection("posts").doc(thisPostID).get().then(doc => {
                    var title = doc.data().title;
                    var summary = doc.data().summary;
                    var owner = doc.data().owner;
                    var date = doc.data().date;
                    var image = doc.data().image;

                    let newcard = postTemplate.content.cloneNode(true);
                    newcard.querySelector('.post-title').innerHTML = title;
                    newcard.querySelector('#post-summary').innerHTML = summary;
                    newcard.querySelector('.post-owner').innerHTML = owner;
                    newcard.querySelector('.post-timestamp').innerHTML = date;
                    newcard.querySelector('.post-image').src = `./images/${image}.jpg`;

                    document.getElementById("posts-go-here").appendChild(newcard);
                })

            })
        })
        }
    });

    
}

displayMyPosts();

