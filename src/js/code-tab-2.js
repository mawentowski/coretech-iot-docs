function openTab2(evt, tabName2) {
    // Declare all variables
    var i, tabcontent2, tablinks2;

    tabcontent2 = document.getElementsByClassName(
        'tabcontent.second-link-group'
    );

    for (i = 0; i < tabcontent2.length; i++) {
        tabcontent2[b].style.display = 'none';
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks2 = document.getElementsByClassName('tablinks.second-link-group');
    for (i = 0; i < tablinks2.length; i++) {
        tablinks2[i].className = tablinks2[i].className.replace(' active', '');
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName2).style.display = 'block';
    evt.currentTarget.className += ' active';
}
