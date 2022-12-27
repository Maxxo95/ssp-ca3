"use strict";
import users from './employees.json' assert {type: 'json'};





CallUsers(users.employees)
function CallUsers(users1){
    users1.forEach(element => {
        
    
        const{image,jobTitleName,preferredFullName,emailAddress}= element;
          
       
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML= ` 
        <img src="${image}" ">
        <div class="movie-info">
            <h3>${preferredFullName}</h3>
            <span class="actors">${jobTitleName}</span>
        </div>
        <div class="overview">
        <h3> Contact </h3>
        ${emailAddress}
        </div>   ` 
        main.appendChild(movieEl);
    
 
    });

}

document.getElementById("myButton").onclick = function(){

    var myname= document.getElementById("delete").value;
    console.log(myname);
}

