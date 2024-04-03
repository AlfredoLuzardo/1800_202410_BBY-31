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
        addPostPins(map);
        
    });
}

showMap();

function addPostPins(map) {

    // READING information from "posts" collection in Firestore
    db.collection('posts').get().then(allPosts => {
        const features = []; // Defines an empty array for information to be added to

        allPosts.forEach(doc => {
            // Extract coordinates of the place
            coordinates = [doc.data().long, doc.data().lat];
            console.log(coordinates);
            // Extract other addition fields that you want etc.
            event_name = doc.data().title; // Event Name
            preview = doc.data().summary; // Text Preview
            img = doc.data().image; // Image
            // url = doc.data().link; // URL

            // Push information (properties, geometry) into the features array
            features.push({
                'type': 'Feature',
                'properties': {
                    'description': `<strong>${event_name}</strong><p>${preview}</p> 
                            <br> <img src=${img}> <br> <a href="/clicked_post.html?id=${doc.id}" target="_blank" 
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