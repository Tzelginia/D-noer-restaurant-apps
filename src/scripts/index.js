import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';

import("../DATA.json").then(({ default: jsonData }) => {
  console.log(jsonData);
  let datas = jsonData["restaurants"];
  let listData = "";
  datas.forEach(function (data) {
    listData += `
        <div class="list_resto">
            <img class="restoImg" src="${data["pictureId"]}" alt="${
      data["name"]
    }" title="${data["name"]}">
            <div class="city_resto">
            <img src="./images/heros/location.png" class="cityLocation">
            ${data["city"]}</div>
            <div class="resto_content">
                
                <p class="rating">
                    <img src="./images/heros/star-icon.png" class="star">
                    <span href="#" class="rateValue">${data["rating"]}</span>
                </p>
                <h1 class="resto_judul"><a href="#">${data["name"]}</a></h1>
                <div class="resto_desc">${data["description"].slice(
                  0,
                  150
                )}...</div>
            </div>
        </div>
        `;
  });
  document.querySelector("#resto_list").innerHTML = listData;
});

const menu = document.querySelector('#menu');
const body = document.querySelector('body');
const navbar_menu = document.querySelector("#navbar_menu");

menu.addEventListener('click', function (event) {
    navbar_menu.classList.toggle("drawer");
    event.stopPropagation();
});

body.addEventListener('click', function () {
    navbar_menu.classList.remove("drawer");
});