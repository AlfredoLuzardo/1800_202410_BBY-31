//---------------------------------------------------
// This function loads the filter options menus for 
// continent, country, and city into navbar_after_login.html
//---------------------------------------------------
function loadLocationOptions() {
    console.log($('#continentListPlaceholder').load('./text/continent_list.html'));
    console.log($('#countryListPlaceholder').load('./text/country_list.html'));
    console.log($('#cityListPlaceholder').load('./text/city_list.html'));
}
loadLocationOptions();

//---------------------------------------------------
// Changes the placeholder innerHTML values in the 
// continent, country, and city dropdown menus
//---------------------------------------------------
function changeLocationLabel(element) {
        // Get the innerHTML of the selected dropdown item
    let selectedLocation = element.innerHTML;

        // If the select continent button was clicked (a dropdown item from the continent menu item was selected)
    if (element.parentElement.parentElement.id == "continent-menu") {
        document.getElementById("continent-filter-option").innerHTML = selectedLocation;
    }
    
        // If the select country button was clicked (a dropdown item from the continent menu item was selected)
    else if (element.parentElement.parentElement.id == "country-menu") {
        document.getElementById("country-filter-option").innerHTML = selectedLocation;
    }

        // If the select city button was clicked (a dropdown item from the continent menu item was selected)
    else {
        document.getElementById("city-filter-option").innerHTML = selectedLocation;
    }
}

//---------------------------------------------------
// Resets the placeholder innerHTML values in the 
// continent, country, and city dropdown menus
//---------------------------------------------------
function resetFilterPlaceholders(){
    document.getElementsByClassName("location-button")[0].querySelector("span").innerHTML = "Select Continent";
    document.getElementsByClassName("location-button")[1].querySelector("span").innerHTML = "Select Country";
    document.getElementsByClassName("location-button")[2].querySelector("span").innerHTML = "Select City";
}
