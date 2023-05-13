import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import LikeButtonInitiator from "../utils/like-button-initiator.js"
import FavoriteRestoIdb from "../data/fav.js"
import swRegis  from "../utils/swRegis";

const showMessage = (message = "Periksa Koneksi Anda!") => {
  alert(message);
};

const menu = document.querySelector("#menu");
const body = document.querySelector("body");
const navbar_menu = document.querySelector("#navbar_menu");

menu.addEventListener("click",  (event)=>{
  navbar_menu.classList.toggle("drawer");
  event.stopPropagation();
});

body.addEventListener("click", () => {
  navbar_menu.classList.remove("drawer");
});

//button home
const home= document.querySelector('#home');
home.addEventListener("click",()=>{
  getResto();
  document.querySelector('#judul').innerText="";
  document.querySelector("#judul").innerText = "Restaurant List";
});
  


// button fav
const favoriteResto= document.querySelector('#favoriteResto');
favoriteResto.addEventListener("click", ()=>{
  document.querySelector('#judul').innerText="";
  document.querySelector("#judul").innerText = "Restaurant Favorite";
  document.querySelector("#show_resto").innerHTML = "";
  fav.renderFav();
});

const baseUrl = "https://restaurant-api.dicoding.dev";
const imageUrl = "https://restaurant-api.dicoding.dev/images/medium/";
// GetResto
const getResto = () => {
  fetch(`${baseUrl}/list`)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error) {
        showMessage(responseJson.message);
      } else {
        makeResto(responseJson.restaurants);
      }
    })
    .catch((error) => {
      showMessage(error);
    });
};
const makeResto = (datas) => {
  let listData = "";
  datas.forEach((data) =>{
    listData += `
        <div class="list_resto">
            <img class="restoImg" src="${imageUrl}${data["pictureId"]}" alt="${
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
                <h1 class="resto_judul" ><a id="${data["id"]}" href="#">${
                  data["name"]
                }</a></h1>
                <div class="resto_desc">${data["description"].slice(
                  0,
                  150
                )}...</div>
            </div>
        </div>
        `;
  });
  document.querySelector("#resto_list").innerHTML = listData;
  let judul = document.querySelectorAll(".resto_judul");
  judul.forEach((title)=>{
    title.addEventListener("click",(event)=>{
      const id = event.target.id;
      console.log(id);
      detailResto(id);
    });
  });


};
//manggil home
getResto();
//service worker
swRegis();

//detail resto
const detailResto = (id) => {
  fetch(`${baseUrl}/detail/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error) {
        showMessage(responseJson.message);
      } else {
        console.log(responseJson.restaurant);
        makeShowResto(responseJson.restaurant);
      }
    })
    .catch((error) => {
      showMessage(error);
    });
};
// make show resto
const makeShowResto = (show) => {
  let listData = "";
  listData = `
                <div class="showImg">
                    <img src="${imageUrl}${show["pictureId"]}"
                        alt="gambar ${show["name"]}">
                    <div class="showName">
                        <h1>${show["name"]}</h1>
                        <p>Rating : ${show["rating"]}</p>
                    </div>
                </div>

                <div class="showCity">
                    ${show["city"]}
                </div>
                <div class="showAddress">
                    ${show["address"]}
                </div>
                <h2>Category</h2>
                <div class="showCategory" id="showCategory"></div>
                <div class="showResto">
                    <h2>Description</h2>
                    <p style="text-align: justify;">${show["description"]}</p>
                    <hr></hr>
                    <h2>Menus & Review Customer</h2>
                    <div class="showMenu">
                        <div class="fnb">
                            <h2>Foods</h2>
                            <div class="showFood" id="showFood"></div>
                            <h2>Drinks</h2>
                            <div class="showDrink" a id="showDrink"></div>
                        </div>
                        <div class="showReview" id="showReview">
                            <h2>Review Customer</h2>
                            <div class="contentReview" id="contentReview"></div>
                        </div>
                    </div>
                </div>
                <div id="likeButtonContainer"></div>
  `;
  document.querySelector("#resto_list").innerHTML = "";
  document.querySelector("#show_resto").innerHTML = listData;
  document.querySelector('#judul').innerText="";
  document.querySelector("#judul").innerText = "Restaurant Detail";
  
  //Category
  let showCategory = "";
  show.categories.forEach((cate) => {
    showCategory += ` 
      ${cate.name}, 
    `;
  });
  document.querySelector("#showCategory").innerHTML = `<p>${showCategory} </p>`;

  // Food
  let showFood = "";
  show.menus.foods.forEach((food) => {
    showFood += `
      <p>${food.name}</p>
    `;
  });
  document.querySelector("#showFood").innerHTML = showFood;

  //Drink
  let showDrink = "";
  show.menus.drinks.forEach((drink) => {
    showDrink += `
      <p>${drink.name}</p>
    `;
  });
  document.querySelector("#showDrink").innerHTML = showDrink;

  //Review
  let showReview = "";
  show.customerReviews.forEach((review) => {
    showReview += `
      <h3>${review.name}</h3>
      <h5>${review.date}</h5>
      <q>${review.review}</q>
    `;
  });
  document.querySelector("#contentReview").innerHTML = showReview;

  //Like button initiator
  LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector("#likeButtonContainer"),
    resto: {
      id: show.id,
      name: show.name,
      description: show.description,
      city: show.city,
      rating: show.rating,
      pictureId: show.pictureId,
    },
  });
};


// render fav
const fav = {
  async renderFav() {
    const resto = await FavoriteRestoIdb.getAllResto();
    if(resto.length==0){
      document.querySelector('#judul').innerText="";
      document.querySelector('#judul').innerText="Nothing Favorite Restaurant";
      document.querySelector('#resto_list').innerHTML="";
    }
    else{
      makeResto(resto);
    }
  },
};