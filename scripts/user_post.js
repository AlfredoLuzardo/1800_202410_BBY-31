// Loads post placeholder into position.
function loadUserPost() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log($('.userPostPlaceholder').load('./text/each_user_post.html'));
        }
    });
}

loadUserPost();

// Fake collection of posts to read from.
function writePosts() {
    var postsRef = db.collection("posts");

    postsRef.add({
        title: "Volunteers Clean Up Riverbank",
        summary: "A group of dedicated volunteers spent the weekend cleaning up litter along the riverbank. Their efforts aim to preserve the local ecosystem and promote environmental awareness.",
        image: "hike1",
        owner: "John Davidson",
        timestamp: "3/19/2024"
    });

    postsRef.add({
        title: "Traffic Jam on Main Street",
        summary: "A major traffic jam occurred on Main Street today, causing delays for commuters. Authorities are advising drivers to seek alternate routes.",
        image: "hike2",
        owner: "Larry Smith",
        timestamp: "5/17/2023"
    });

    postsRef.add({
        title: "Community Rally for Park Renovation",
        summary: "Residents gathered at City Hall to rally for the renovation of the local park. The proposed plans include new playground equipment, walking trails, and picnic areas.",
        image: "hike3",
        owner: "Michael Mcdonald",
        timestamp: "6/22/2023"
    });

}

function displayPostsDynamically(collection) {
    let postTemplate = document.getElementById("post-container");

    db.collection(collection).get()
        .then(allPosts => {
            allPosts.forEach(doc => {
                var title = doc.data().title;
                var summary = doc.data().summary;
                var owner = doc.data().owner;
                var timestamp = doc.data().timestamp;
                var image = doc.data().image;

                let newcard = postTemplate.content.cloneNode(true);
                newcard.querySelector('.post-title').innerHTML = title;
                newcard.querySelector('#post-summary').innerHTML = summary;
                newcard.querySelector('.post-owner').innerHTML = owner;
                newcard.querySelector('.post-timestamp').innerHTML = timestamp;
                newcard.querySelector('.post-image').src = `./images/${image}.jpg`;

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })

}

displayPostsDynamically("posts");