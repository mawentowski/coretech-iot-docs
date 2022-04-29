/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
    document.getElementById('myDropdown').classList.toggle('hidden');
    document
        .getElementById('apis-drop-down-expander')
        .classList.toggle('rotated');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        var apiDropdownExpander = document.getElementsByClassName(
            'apis-drop-down-expander'
        );
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                apiDropdownExpander.classList.remove('rotated');
            }
        }
    }
};
