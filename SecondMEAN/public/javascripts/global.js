/**
 * Created by Chris on 1/9/2015.
 */

// Userlist data array for filling in info box
var userListData = [];


// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the user table on initial page load
    populateTable();
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
});


// Functions =============================================================

function populateTable(){
  var tableContent = '';
    
    $.getJSON('/users/userlist', function(data){

        userListData = data;

        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        })
        $('#userList table tbody').html(tableContent);
    });

};

function showUserInfo(event){
    var thisUserName, arrayPosition, thisUserObject;
    event.preventDefault();
    thisUserName = $(this).attr('rel');

    arrayPosition = userListData.map(function(arrayItem) {
        return arrayItem.username;
    }).indexOf(thisUserName);

    thisUserObject = userListData[arrayPosition];

    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};