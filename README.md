# Project Title
LinkSphere

## 1. Project Description 
Our team, BBY-31 is developing LinkSphere to help local people and journalists spread awareness on overshadowed issues, by allowing them to make posts with their geolocation onto a world map. Some of the core features of this app include, creating a post, viewing individual posts, viewing posts on a world map, viewing your profile, and viewing your history. This is a browser based application that attempts to allow users to spread awareness on issues that are not shown often by mainstream media outlets. It also attempts to get users to know better geography, and works like a map based social media.

## 2. Names of Contributors  
* Hi, my name is Alfredo Luzardo! I am aspiring to become a software developer and I am really excited to make this project a reality.
* Hi my name is Kristian Santos, building this project is exciting to me.
* Jason Lau - I am excited to contribute to this project.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* MapBox 2.7.0
* Manrope font
* Logo made by LinkSphere! 
* Google Material Symbols Outlined

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* To use our application, a user needs to create an account when they first open the website.
* Then, a user can view and read all of the posts created by users on the map and in the side panel. 
* If a user wants to create a post, they can go to the incorporate post page to create one. 
* Then they can check their profile to view how many posts they have read, the posts they have created, and other info. 
* If the user wants to re-read or view the posts they have read, they can go to the post history page.
* A user can also check the aboutus page to understand more about this application.

## 5. Known Bugs and Limitations
Here are some known bugs:
* The main.html page has a fluidity issue. The size of the screen can change in height whenever a user zooms in our out. 
* The Navigation Bar has a sizing issue; Right before the switch to mobile view the navigation bar becomes compressed/squished.
* The application does not let you know that the image of the post is uploading whenever a post is created. This means that users may become confused and hit the submit button button multiple times. If they do this the post will be uploaded multiple times, and the post will not register that it was from the user.
* The top posts currently shows all of the posts.
* A grey bar appears next to the side panel on desktop view when you first go onto the main page.
* On the mobile view, the side panel covers half the screen when the main page is first opened.
* On mobile view, whenever the side panel button is clicked, it stays in its clicked color (black).
* There is a footer issue on the profile page, where a normal bootstrap footer stays in the middle of the page when there are no posts, and sticky footer covers posts when there are more than one. 

## 6. Features for Future
What we'd like to build in the future:
* We want to complete the search bar and filter functionality. We think this would allow for greater user experience and effeciency.
* We want to include a comments section for each post so that users can discuss about the topic. 
* We want to allow users to visit other profiles and search for other profiles. 
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .firebaserc              # Where the repository is associated with the firebase project
├── .gitignore               # Git ignore file
├── 404.html                 # The 404 page, where users are brought when a page cant load
├── aboutus.html             # The aboutus page, which gives a small description about the application
├── clicked_post.html        # The clicked post page, where users are brought to when they want to read an individual post
├── firebase.json            # Firebase JSON file
├── firestore.indexes.json   # Firestore.indexes JSON file
├── firestore.rules          # Holds the rules for reading and writing to firestore
├── incorporate_post.html    # The incorporate post page, where users can create a post
├── index.html               # Landing HTML file, this is what users see when you come to url
├── login.html               # The login page, where users can login (comes after index page)
├── main.html                # The main page, where users can view the map and see the top posts
├── post_history.html        # The post history page, where users can view which posts they have read
├── profile_page.html        # The profile page that holds all the info about the user
├── README.md                # The file you are reading now!
├── searched_articles.html   #
├── storage.rules            # Holds the rules for reading and writing to firebase storage
└── successful_incorporate.html # The confirmation page a user is taken to after creating a post

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── .firebase                # Folder for firebase
        /hosting.cache           # Hosting cache for deployed app
├── font                     # Folder for fonts
        /manrope.ttf             # Manrope font, main font used in the website
        /OFL.txt                 # Manrope font license
├── images                   # Folder for images
        /logoInverse.png         # LinkSphere logo
        /placeholder.png         # Image for map pins
├── scripts                  # Folder for scripts
        /authentication.js       # Script for user authentication and login
        /clicked_post.js         # Script for viewing an individual post
        /displayPosts.js         # Script for displaying posts on a page
        /edit_post.js            #
        /firebaseAPI_BBY31.js    # Script for firebase configurations
        /incorporate_post.js     # Script for creating a post
        /location_filter.js      # Script for the filter option in search bar
        /main.js                 # Script for the main.html page
        /map.js                  # Script for the MapBox map API
        /post_history.js         # Script for displaying post history
        /profile.js              # Script for displaying profile information
        /script.js               # Script for the logout function
        /search_bar.js           # Script for the search bar
        /searched_articles.js    # 
        /skeleton.js             # Script for loading all the placeholders, such as navbars, footers etc
├── styles                   # Folder for styles
        /aboutus.css             # Styling for the about us page
        /clicked_post.css        # Styling for the clicked post page
        /incorporate_post.css    # Styling for the incorporate post page
        /main_posts.css          # Styling for the posts that appear on the main page side panel
        /main.css                # Styling for the main page 
        /post.css                # Styling for the normal posts
        /profile.css             # Styling for the profile page 
        /style.css               # Styling for the navigation bar
├── text                   # Folder for html placeholders that are to be re-used in different pages
        /city_list.html          # Holds the list for cities
        /continent_list.html     # Holds the list for continents
        /country_list.html       # Holds the list for countries 
        /each_user_post.html     # Includes the HTML structure for one post
        /footer.html             # Includes the Bootstrap structure for the normal footer
        /nav_after_login.html    # Includes the HTML structure for the navbar after the user has logged in
        /nav_before_login.html   # Includes the HTML structure for the navbar before the user has logged in
        /sticky_footer.html      # Includes the Bootstrap structure for the sticky footer



```


