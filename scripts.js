//employee-directory/scripts.js
const apiURL = "https://randomuser.me/api/?results=12";
const request = new XMLHttpRequest();
const gallery = document.getElementById('gallery');
const app = document.body;

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
        card.addEventListener('click', function(event) {
            //CREATE MODAL ELEMENTS
            const modalContainer = document.createElement('div');
            const modal = document.createElement('div');
            const closeBtn = document.createElement('button');
            const modalInfo = document.createElement('div');
            const modalImg = document.createElement('img');
            const h3 = document.createElement('h3');
            const p = document.createElement('p');
            //SET MODAL ELEMENT ATTRIBUTES
            modalContainer.setAttribute('class','modal-container');
            modal.setAttribute('class','modal');
            closeBtn.innerHTML = '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
            closeBtn.addEventListener('click', function(event){modalContainer.style.display = 'none'})
            modalInfo.setAttribute('class','modal-info-container');
            modalImg.innerHTML = `<img class="modal-img" src=${user.picture.medium} alt="profile picture">`;
            h3.setAttribute('class','modal-name cap');
            h3.textContent = user.name.first + ' ' + user.name.last;
            p.setAttribute('class','modal-text');
            p.textContent = 
            `${user.email}
            ${user.location.city}
            ${user.phone}
            ${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.state}
            Birthday: ${user.dob.date}`
            //APPEND MODAL ELEMENTS TO PAGE
            app.appendChild(modalContainer);
            modalContainer.appendChild(modal);
            modal.appendChild(closeBtn);
            modal.appendChild(modalInfo);
            modalInfo.appendChild(modalImg);
            modalInfo.appendChild(h3);
            modalInfo.appendChild(p);
            })
        });
    } else { //IF THE REQUEST DOESN'T WORK, DISPLAY AN ERROR MESSAGE
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `It's not working`;
    app.appendChild(errorMessage);
  }
}
request.send();