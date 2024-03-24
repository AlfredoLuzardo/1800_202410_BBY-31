//---------------------------------------------------
// Adds an event listener to the search-form id element
// (the form for the search and filter form)
// in nav_after_login.html
//---------------------------------------------------

// NEED TO SAVE ALL FORM DATA IN THIS FUNCTION LATER
let searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // (NOT WORKING YET, NEED TO FIX) Get the id of the search type input element,
    // containing a text field with the entered search string
    let searchText = document.getElementById("search-text");

    if (searchText.value != "") {
        console.log("entered search text: " + searchText.value);
        // Add text in the header in searched_articles.html to the entered text (NOT WORKING YET, NEED TO FIX)
        // document.getElementById("searched-text").innerText = searchText.value;a
        window.location.href = 'searched_articles.html';
    }
});


// SAVE SERACH TEXT VALUE (MAYBE GET FROM LOCALSTORAGE) AND PASS INTO searched_articles.js)
