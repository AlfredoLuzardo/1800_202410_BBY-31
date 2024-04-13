//------------------------------------------------------
// Function that initializes and displays the MapBox map
//------------------------------------------------------
function showMap() {
    //------------------------------------------
    // Defines and initiates basic mapbox data
    //------------------------------------------
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
    // After loading, can add map features
    //------------------------------------------------
    map.on('load', () => {
        // Call the addPostPins function to add interactive pins for the posts
        addPostPins(map);
    });
}
showMap();

//-----------------------------------------------------------------------------------------------------------
// Function that adds the post pins to the map. It does this by creating a new layer ontop of the MapBox map.
// Input parameter is the MapBox map. 
//-----------------------------------------------------------------------------------------------------------
function addPostPins(map) {

    map.loadImage('./images/placeholder.png',
        (error, image) => {
            if (error) throw error;

            map.addImage('eventpin', image);

            // READING information from "posts" collection in Firestore
            db.collection('posts').get().then(allPosts => {
                const features = []; // Defines an empty array for information to be added to

                allPosts.forEach(doc => {
                    // Extract coordinates of the place
                    coordinates = [doc.data().long, doc.data().lat];
                    console.log(coordinates);
                    
                    // Extract other addition fields that you want etc.
                    title = doc.data().title; // Post title
                    img = doc.data().image; // Image
                    date = doc.data().date; // Date
                    viewcount = doc.data().viewcount; // Post viewcount

                    // Push information (properties, geometry) into the features array
                    features.push({
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${title}</strong> 
                            <div><img src=${img} id="image-popup"></div>
                            <div id="anchor-div"><a href="/clicked_post.html?postID=${doc.id}" target="_blank" 
                            title="Opens in a new window">READ MORE</a></div>
                            <div>${date}</div>
                            <div id="viewcount">Views: ${viewcount}</div>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': coordinates
                        }
                    });
                });

                // Adds pins to the map
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
                    'type': 'symbol', // what the pins look like
                    'source': 'places',
                    'layout': {   // The pin images
                        'icon-image': 'eventpin',
                        'icon-size': 0.05,
                        'icon-allow-overlap': true
                    }
                });

                // When one of the pins are clicked,
                // create a popup that shows information 
                // Everything related to a pin is save in features[] array
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
        })
}
