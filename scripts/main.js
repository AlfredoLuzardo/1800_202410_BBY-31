//---------------------------------------------------
// This function loads articles into main.html
//---------------------------------------------------
/*
function loadTopArticles() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //! Temporary - will need to replace with actual data from firestore later
            console.log($('.topArticlePlaceholder').load('./text/each_user_post.html')); //! temporarily using each_saved_article, but will not be from saved articles later
        }
    });
}

loadTopArticles();
*/

function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            nameHTML = document.getElementById("name-goes-here");
            userName = user.displayName;
            if (nameHTML != null) {
                nameHTML.innerHTML = user.displayName;
            }

            //**************************************************************************************************************************************************************
            // Get the time that the user joined
            // PUT IN NEW JS FILE
            db.collection("users").doc(user.uid)
                .onSnapshot(userDoc => {
                    const jdHTML = document.getElementById("dateJoined-goes-here");
                    const cHTML = document.getElementById("country-goes-here");
                    let jd = userDoc.data().joinDate;
                    let c = userDoc.data().country;
                    if (jdHTML != null){
                        jdHTML.innerHTML = jd;
                    }

                    if (cHTML !== null){
                        cHTML.innerHTML = c;
                    }  
 
                })
            //****************************************************************************************************************** */

            // GET POST VIEW HISTORY FROM USER COLLECTION - DISPLAY VIEW COUNT



        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}
getNameFromAuth();

//---------------------------------------------------
// This function loads the top posts into main.html
//---------------------------------------------------
function getTopPosts() { // RIGHT NOW LOADS ALL OF THE POSTS INTO MAIN
    // get the from the posts collection (LATER CHANGE to get the top (#) of posts)
    

    // display each of them in main.html (call the displayPostDynamically() function in displayPosts.js) (2 hours).
}






function showMap() {
    //------------------------------------------
    // Defines and initiates basic mapbox data
    //------------------------------------------
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken = 'pk.eyJ1IjoibHV6YXJkb25ldG8yMDA1IiwiYSI6ImNsdWJodXlpNjB3dGQybG1uMjZ2YXl0eDgifQ.A2VnAh7CYilLWyuA-fXzlQ';
    const map = new mapboxgl.Map({
        container: 'map', // Container ID
        style: 'mapbox://styles/mapbox/streets-v11', // Styling URL
        center: [-122.964274, 49.236082], // Starting position
        zoom: 8 // Starting zoom
    });

    // Add user controls to map, zoom bar
    map.addControl(new mapboxgl.NavigationControl());

    //------------------------------------------------
    // Add listener for when the map finishes loading.
    // After loading, we can add map features
    //------------------------------------------------
    map.on('load', () => {

        //---------------------------------
        // Add interactive pins for the hikes
        //---------------------------------
        addHikePins(map);

        //--------------------------------------
        // Add interactive pin for the user's location
        //--------------------------------------
        addUserPin(map);
        
    });
}

showMap();

function addPostPinsCircle(map) {

    // READING information from "posts" collection in Firestore
    db.collection('posts').get().then(allPosts => {
        const features = []; // Defines an empty array for information to be added to

        allPosts.forEach(doc => {
            // Extract coordinates of the place
            coordinates = [doc.data().lng, doc.data().lat];
            console.log(coordinates);
            // Extract other addition fields that you want etc.
            event_name = doc.data().name; // Event Name
            preview = doc.data().details; // Text Preview
            // img = doc.data().posterurl; // Image
            // url = doc.data().link; // URL

            // Push information (properties, geometry) into the features array
            features.push({
                'type': 'Feature',
                'properties': {
                    'description': `<strong>${event_name}</strong><p>${preview}</p> 
                            <br> <a href="/hike.html?id=${doc.id}" target="_blank" 
                            title="Opens in a new window">Read more</a>`
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': coordinates
                }
            });
        });

        // Adds features (in our case, pins) to the map
        // "places" is the name of this array of features
        map.addSource('places', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': features
            }
        });

        // Creates a layer above the map displaying the pins
        // Add a layer showing the places.
        map.addLayer({
            'id': 'places',
            'type': 'circle', // what the pins/markers/points look like
            'source': 'places',
            'paint': {   // customize colour and size
                'circle-color': '#4264fb',
                'circle-radius': 6,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
            }
        });

        // When one of the "places" markers are clicked,
        // create a popup that shows information 
        // Everything related to a marker is save in features[] array
        map.on('click', 'places', (e) => {
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple 
            // copies of the feature are visible, the popup appears over 
            // the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse hovers over the places layer.
        map.on('mouseenter', 'places', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Defaults cursor when not hovering over the places layer
        map.on('mouseleave', 'places', () => {
            map.getCanvas().style.cursor = '';
        });
    });
}