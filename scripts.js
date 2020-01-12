//employee-directory/scripts.js
const apiURL = "https://randomuser.me/api/?results=10";
const request = new XMLHttpRequest();
const gallery = document.getElementById('gallery');

//REQUEST DATA FROM API
request.open('GET', apiURL, true);
request.onload = function () {
    let data = JSON.parse(this.response).results;
    console.log(data);
    if (request.status >= 0 && request.status < 400) {
        data.forEach(user => {
        //CREATE CARD FOR EACH USER
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        //CREATE CONTAINER TO HOLD INFO INSIDE OF CARD
        const cardInfo = document.createElement('div');
        cardInfo.setAttribute('class','card-info-container')
        //GET PIC FROM API
        const profilePic = document.createElement('div');
        profilePic.innerHTML = `<img class="card-img" src=${user.picture.thumbnail} alt="profile picture"></img>`;
        //GET FIRST AND LAST NAME FROM API
        const h1 = document.createElement('h1');
        h1.textContent = user.name.first + ' ' + user.name.last;
        //GET EMAIL AND LOCATION FROM API
        const p = document.createElement('p');
        p.textContent = `${user.email}
        ${user.location.city}, ${user.location.state}`;
        //DISPLAY USER INFO ON CARD
        card.appendChild(profilePic);
        gallery.appendChild(card);
        card.appendChild(cardInfo);
        cardInfo.appendChild(h1);
        cardInfo.appendChild(p);
        });
    } else { //IF THE REQUEST DOESN'T WORK, DISPLAY AN ERROR MESSAGE
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `It's not working`;
    app.appendChild(errorMessage);
  }
}
request.send();
